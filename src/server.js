const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

require('./database/index');

app.use(routes);


app.listen(process.env.port || 8080, async () => {
  console.log("App listen on port 8080");
})
