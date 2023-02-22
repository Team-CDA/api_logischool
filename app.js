// const checkAuth = require('./helpers/jwt');
const express = require('express');
const morgan = require('morgan');
const {success,getSwagger} = require('./helper');
const usersRouter  = require('./routes/users.router');
const usersGroup = require('./routes/users_groups.router');
const statusesRouter  = require('./routes/statuses.router');
const groupsRouter  = require('./routes/groups.router');
const rolesRouter  = require('./routes/roles.router');
const reportTypesRouter = require('./routes/report_types.router');
const reportsRouter = require('./routes/reports.router');
const alertTypesRouter = require('./routes/alert_types.router');
const alertsRouter = require('./routes/alerts.router');
const alertsGroupsRouter = require('./routes/alerts_groups.router');
const classTypesRouter = require('./routes/class_types.router');
const classesRouter = require('./routes/classes.router');
const usersClassesRouter = require('./routes/users_classes.router');
const eventsRouter = require('./routes/events.router');
const roomTypesRouter = require('./routes/room_types.router');
const roomsRouter = require ('./routes/rooms.router');
const eventTypesRouter = require('./routes/event_types.router');
const timeslotsRouter = require('./routes/timeslots.router');
const lessonsRouter = require('./routes/lessons.router');
const subjectsRouter = require('./routes/subjects.router');
const referent_teachersRouter = require('./routes/referent_teachers.router');
const homeworksRouter = require('./routes/homeworks.router');
const buildingsRouter = require('./routes/buildings.router');
const eventsGroupsRouter = require('./routes/events_groups.router');
const swaggerUI = require('swagger-ui-express');
const jwt = require('jsonwebtoken');
// const fs = require('fs');
require('dotenv').config();

// var logFilePath = '/var/log/morgan.log';
// var logStream = fs.createWriteStream(logFilePath, { flags: 'a' });



//On créé une instance d'une application express (c'est notre serveur)
const app = express();

app.get('/');
app.use(express.json());
app.use(morgan('dev'));
// app.use(morgan('combined', { stream: logStream }));

app.use('/users', usersRouter);
app.use('/users_groups', usersGroup);

app.use('/roles', rolesRouter);

app.use('/statuses', statusesRouter);

app.use('/groups', groupsRouter);

app.use('/report_types', reportTypesRouter);
app.use('/reports', reportsRouter);

app.use('/alert_types', alertTypesRouter);
app.use('/alerts', alertsRouter);

app.use('/alerts_groups', alertsGroupsRouter);

app.use('/class_types', classTypesRouter);
app.use('/classes', classesRouter);

app.use('/users_classes', usersClassesRouter);

app.use('/events', eventsRouter);
app.use('/event_types', eventTypesRouter);

app.use('/room_types', roomTypesRouter);
app.use('/rooms', roomsRouter);

app.use('/timeslots', timeslotsRouter);

app.use('/lessons', lessonsRouter);
app.use('/referent_teachers', referent_teachersRouter);

app.use('/buildings', buildingsRouter)

app.use('/homeworks', homeworksRouter)
app.use('/subjects', subjectsRouter)
app.use('/events_groups', eventsGroupsRouter)

app.use('/doc', swaggerUI.serve, swaggerUI.setup(getSwagger()))
//On définit un port par défaut
const port = 3000;


//Premier point de terminaison. Dans un premier temps, le première argument est la route, le deuxième paramètre est une fonction qui recoit une requête et qui renvoie une réponse (req et res).
// on utilise la méthode send de la réponse pour renvoyer un message
app.get('/', (req, res) => {
    const message = "🖕"
    // const data =  'lol'
    res.json(success(message));
});

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
});


//On démarre l'api sur le port 3000 en affichant un message
app.listen(port, () => console.log(`Notre application est démarré sur http://localhost:${port}`));
