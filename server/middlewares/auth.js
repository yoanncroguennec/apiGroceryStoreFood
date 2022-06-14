const jwt = require('jsonwebtoken')


// Auth Client
const auth = (req, res, next) => {
    try {
        // L'en-tête de requête HTTP Authorization : Contient les identifiants permettant l'authentification d'un User auprès d'un serveur
        // Récupérer "accesstoken" pour remplir le "header" de "Authorization" dans "Postman"
        const token = req.header("Authorization")
        if (!token)
            return res.status(400).json({ msg: "Authentication invalide" })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Authentication invalide" })

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth