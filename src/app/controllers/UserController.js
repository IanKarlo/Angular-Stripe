const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

class UserController {

  async store(req, res) {
    try {
      
      const { name, email, password } = req.body;
      
      const user = await Users.findOne({where: { email }});

      if(user) {
        return res.status(400).send({ error: 'Email already exists' });
      }

      const newUser = await Users.create({name, email, password});

      const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: '1d'});

      return res.status(200).send({
        user: {
          name,
          id: newUser.id,
          amount: newUser.amount,
        }, 
        token
      });
      
    } catch(error) {
      console.log(error)
      return res.status(401).send({ error: 'Error to create new user' });
    }
  }

}

module.exports = new UserController();