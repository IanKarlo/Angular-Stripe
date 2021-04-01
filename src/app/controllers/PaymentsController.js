const Payments = require('../models/Payments');
const Users = require('../models/Users');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

class PaymentController {
  async store(req, res) {

    try {

      const {amount, currency} = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        metadata: {integration_check: 'accept_a_payment'},
      });

      const user_id = req.userId, payment = paymentIntent.id, 
        client_secret = paymentIntent.client_secret, value = amount,
        status = 'Em análise';

      const newPayment = await Payments.create({
        value,
        currency,
        status,
        client_secret,
        payment,
        user_id
      });
      
      return res.status(200).send({clientSecret: paymentIntent.client_secret});
    } catch(err) {
      console.log(err);
      return res.status(400).send({ error: 'Error to make a payment intent' });
    }
  }

  async index(req, res) {
    try {

      const payments = await Payments.findAll({where: {user_id: req.userId}});
      return res.status(200).send({payments});
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: 'Error to get payment intents' });
    }
  }

  async webhook(req, res) {
    try {
      const event = req.body;
      
      switch(event.type) {
        case 'payment_intent.succeeded':
          handleSucceededPayment(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          handleCanceledPayment(event.data.object);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      console.log(err);
    }

    return res.send('ok');
  }
  
}

async function handleSucceededPayment(data) {
  try {
    const payment = await Payments.findOne({ where: { payment: data.id } });
    const user = await Users.findOne({ where: { id: payment.user_id } });
    const balancetransaction = await stripe.balanceTransactions.retrieve(data.charges.data[0].balance_transaction);

    payment.status = 'Pagamento aceito';
    user.amount += (balancetransaction.net / 100);
    await payment.save();
    await user.save(); 
  } catch(err) {
    console.log(err);
    console.log("Error to update payment object");
  }
}

async function handleCanceledPayment(data) {
  try {
    const payment = await Payments.findOne({ where: { payment: data.id } });

    payment.status = 'Pagamento recusado';
    
    await payment.save();
  } catch(err) {
    console.log("Error to update payment object");
  }
}

module.exports = new PaymentController();
