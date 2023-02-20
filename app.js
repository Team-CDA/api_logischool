// On récupère le paquet express
const checkAuth = require('./helpers/jwt');
const express = require('express')
const morgan = require('morgan')
const {success,getSwagger} = require('./helper')
const usersRouter  = require('./routes/users.router')
const rolesRouter  = require('./routes/roles.router')
// const lessonsRouter  = require('./routes/lessons.router')
const alertTypesRouter = require('./routes/alert_types.router')
const classesRouter = require('./routes/classes.router')
const swaggerUI = require('swagger-ui-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//On créé une instance d'une application express (c'est notre serveur)
const app = express()

app.get('/')
app.use(express.json())
app.use(morgan('dev'))

app.use('/users', usersRouter)

app.use('/roles', rolesRouter)

// app.use('/lessons', lessonsRouter)

app.use('/alert_types', alertTypesRouter)

app.use('/classes', classesRouter)

app.use('/doc', swaggerUI.serve, swaggerUI.setup(getSwagger()))
//On définit un port par défaut
const port = 3000


//Premier point de terminaison. Dans un premier temps, le première argument est la route, le deuxième paramètre est une fonction qui recoit une requête et qui renvoie une réponse (req et res).
// on utilise la méthode send de la réponse pour renvoyer un message
app.get('/', (req, res) => {
    const message = "Bienvenue sur notre API"
    const data =  '100'
    res.json(success(message,data));
})

app.get('/getToken', (req, res) => {
    const payload = {id: 1, email: 'pif@fmail.com'};
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '2min' };
    const token = jwt.sign(payload, secret, options);
    console.log(token);
    res.status(200).json({message: 'Token generated', token: token});
});



//Gestion de l'erreur 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


//On démarre l'api sur le port 3000 en affichant un message
app.listen(port, () => console.log(`Notre application est démarré sur http://localhost:${port}`))
