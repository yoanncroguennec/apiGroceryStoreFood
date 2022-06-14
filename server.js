require('dotenv').config({ path: ".env" })
const app = require('./app/app')

// CONNECT DB
const connectDB = require('./server/database/db')
connectDB();

// STRIPE
app.post("/api/stripe-payment", (req, res) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  
  const descWithStripe  = "Epicerie en ligne"

  const { amount, email, token } = req.body;

  stripe.customers
    .create({
      email: email,
      source: token.id,
      name: token.card.name,
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: parseFloat(amount) * 100,
        description: `Paiement de ${amount} € avec ${descWithStripe}`,
        currency: "EUR",
        customer: customer.id,
      });
    })
    .then((charge) => res.status(200).send(charge))
    .catch((err) => console.log(err));
});

app.listen(5015, () =>
  console.log(`app listening at http://localhost: 5015`)
);
