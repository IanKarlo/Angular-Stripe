const { promisify } = require('util')
const jwt = require('jsonwebtoken');

const Users = require('../models/Users');

class SessionController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      

      const user = await Users.findOne({where: { email }});
      
      if(!user) {
        return res.status(400).send({ error: 'User not found' });
      }
      
      if(password != user.password) {
        return res.status(400).send( { error: 'Invalid password' });
      }
      
      const token = await jwt.sign( { id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      return res.status(200).send({
        user: {
          id: user.id,
          name: user.name,
          amount: user.amount
        },
        token
      });
    } catch(err) {
      console.log(err);
      return res.status(400).send( { error: 'Error in login' });
    }
  } 

  async authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    if(!token) {
      return res.status(401).send({ error:'Token not provided' });
    }

    try {

      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      req.userId = decoded.id;

      return next();

    } catch(err) {
      return res.status(401).send({ error:'Invalid Token' });
    }
  }
}

module.exports = new SessionController();