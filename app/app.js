const express = require('express')
const cors = require('cors')
const logger = require("morgan");

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "erreur, quelque chose a mal tourné !";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// ROUTES
app.get('/', (req, res) => {
    res.json({ msg: "Welcome." })
})
app.use('/api/auth', require('../server/routes/Auth.routes'))
app.use('/api/products', require('../server/routes/Products.routes'))
app.use('/api/users', require('../server/routes/Users.routes'))


module.exports = app 