const path = require("path");
const express = require("express");
const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

//static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/images")));

const server = app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});

const SocketIO = require("socket.io");
//socket.io necesita un servidor ya inicializado para hacer la comunicacion bidireccional:
const io = SocketIO(server);
//socket.io envia un archivo js a http://localhost:3000/socket.io/socket.io.js para comunicarse
//se guarda esta configuracion en io

//websockets
io.on("connection", (socket) => {
  console.log("new connection established", socket.id);
  socket.on("chat:message", (data) => {
    //para emitir el sockets a todas las conexiones incluyendo al propio usuario (el nombre del evento podria ser diferente)
    io.sockets.emit("chat:message", data);
  });
  socket.on("chat:typing", (data) => {
    //para emitir el socket a todos menos a el usuario que emitio:
    socket.broadcast.emit("chat:typing", data);
  });
});
