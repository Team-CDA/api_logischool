const checkAuth = require("./helpers/jwt");
const publicRoutes = [
  "/",
  "/users/login",
  "/classes",
  "/users",
  "/buildings",
  "/establishments",
  "/menus",
  "/establishment_types",
  "/events",
  "/groups",
  "/lessons",
  "/rooms",
  "/signatures",
  "/subjects",
  "/users_groups",
  "/users_classes",
  "/roles",
  "/statuses",
  "/report_types",
  "/reports",
  "/alert_types",
  "/alerts",
  "/alerts_groups",
  "/class_types",
  "/event_types",
  "/timeslots",
  "/referent_teachers",
  "/room_types",
  "/establishments/all",
  "/establishments/one",
  "/establishments/updateEstablishment",
  "/establishments/one/:id",
  "/files/:filename",
  "/liaison_books",
  "/alerts_users",
];

const publicMiddleware = (req, res, next) => {
  if (publicRoutes.some((route) => req.path.startsWith(route))) {
    return next();
  }
  checkAuth(req, res, next);
};

const express = require("express");
const morgan = require("morgan");
const {
  success,
  getSwagger
} = require("./helper");
const usersRouter = require("./routes/users.router");
const establishmentsRouter = require("./routes/establishments.router");
const establishmentTypesRouter = require("./routes/establishment_types.router");
const usersGroup = require("./routes/users_groups.router");
const statusesRouter = require("./routes/statuses.router");
const groupsRouter = require("./routes/groups.router");
const rolesRouter = require("./routes/roles.router");
const reportTypesRouter = require("./routes/report_types.router");
const reportsRouter = require("./routes/reports.router");
const alertTypesRouter = require("./routes/alert_types.router");
const signaturesRouter = require("./routes/signatures.router");
const alertsGroupsRouter = require("./routes/alerts_groups.router");
const classTypesRouter = require("./routes/class_types.router");
const classesRouter = require("./routes/classes.router");
const usersClassesRouter = require("./routes/users_classes.router");
const eventsRouter = require("./routes/events.router");
const roomTypesRouter = require("./routes/room_types.router");
const roomsRouter = require("./routes/rooms.router");
const eventTypesRouter = require("./routes/event_types.router");
const timeslotsRouter = require("./routes/timeslots.router");
const lessonsRouter = require("./routes/lessons.router");
const subjectsRouter = require("./routes/subjects.router");
const referent_teachersRouter = require("./routes/referent_teachers.router");
const homeworksRouter = require("./routes/homeworks.router");
const buildingsRouter = require("./routes/buildings.router");
const eventsGroupsRouter = require("./routes/events_groups.router");
const scheduleRouter = require("./routes/schedule.router");
const usersSubjectsRouter = require("./routes/users_subjects.router");
const menusRouter = require("./routes/menus.router");
const liaison_booksRouter = require("./routes/liaison_books.router");
const alertsUsersRouter = require("./routes/alerts_users.router");
const profclassRouter = require("./routes/profclass.router");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
// const fs = require('fs');
require("dotenv").config();

// var logFilePath = '/var/log/morgan.log';
// var logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

//On créé une instance d'une application express (c'est notre serveur)
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:1212"] // Remplacez '*' par l'URL de votre client React.js pour limiter les connections
  },
});
const alertsRouter = require("./routes/alerts.router");
const configuredAlertsRouter = alertsRouter(io);
app.use(cors());

app.use(publicMiddleware);

app.get("/");
app.use(express.json());
app.use(morgan("dev"));
// app.use(morgan('combined', { stream: logStream }));
const path = require("path");

app.get("/files/:filename", (req, res) => {
  const {
    filename
  } = req.params;
  const filePath = path.join(__dirname, "images", filename);
  res.sendFile(filePath);
});

app.use("/establishment_types", establishmentTypesRouter);

app.use("/users", usersRouter);
app.use("/users_groups", usersGroup);

app.use("/roles", rolesRouter);

app.use("/statuses", statusesRouter);

app.use("/groups", groupsRouter);

app.use("/report_types", reportTypesRouter);
app.use("/reports", reportsRouter);

app.use("/alert_types", alertTypesRouter);
app.use("/alerts", configuredAlertsRouter);
app.use("/alerts_groups", alertsGroupsRouter);
app.use("/alerts_users", alertsUsersRouter);

app.use("/class_types", classTypesRouter);
app.use("/classes", classesRouter);

app.use("/users_classes", usersClassesRouter);

app.use("/signatures", signaturesRouter);

app.use("/liaison_books", liaison_booksRouter);

app.use("/events", eventsRouter);
app.use("/event_types", eventTypesRouter);

app.use("/room_types", roomTypesRouter);
app.use("/rooms", roomsRouter);

app.use("/timeslots", timeslotsRouter);

app.use("/menus", menusRouter);

app.use("/lessons", lessonsRouter);
app.use("/referent_teachers", referent_teachersRouter);

app.use("/buildings", buildingsRouter);

app.use("/homeworks", homeworksRouter);
app.use("/subjects", subjectsRouter);
app.use("/events_groups", eventsGroupsRouter);
app.use("/users_subjects", usersSubjectsRouter);

app.use("/schedule", scheduleRouter);

// app.use('/establishments', establishmentsRouter)

app.use("/establishments", establishmentsRouter);
app.use("/profclass", profclassRouter);
app.use("/doc", swaggerUI.serve, swaggerUI.setup(getSwagger()));

const port = 3000;
const message = "❤️";

//Premier point de terminaison. Dans un premier temps, le première argument est la route, le deuxième paramètre est une fonction qui recoit une requête et qui renvoie une réponse (req et res).
// on utilise la méthode send de la réponse pour renvoyer un message
app.get("/", (req, res) => {
  // const data =  ''
  res.json(success(message));
});

// app.get('/getToken', (req, res) => {
//     const payload = {id: 1, email: 'pif@fmail.com'};
//     const secret = process.env.JWT_SECRET;
//     const options = { expiresIn: '2min' };
//     const token = jwt.sign(payload, secret, options);
//     console.log(token);
//     res.status(200).json({message: 'Token generated', token: token});
// });

//Gestion de l'erreur 404
app.use(({
  res
}) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({
    message
  });
});

//On démarre l'api sur le port 3000 en affichant un message
http.listen(port, () =>
  console.log(
    `Notre application est démarré sur http://localhost:${port} ${message}`
  )
);

io.on("connection", (socket) => {
  // console.log("User connected");

  socket.on("disconnect", () => {
    console.log("Un client s'est déconnecté");
  });
});