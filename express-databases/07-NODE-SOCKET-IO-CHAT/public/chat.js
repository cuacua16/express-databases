console.log("hola desde chat.js");

// io();
//podria recibir el dominio como argumento pero se puede omitir porque reconoce el dominio propio
//se genera una nueva conexion io

const socket = io();
//este socket es el codigo del frontend que va a enviar los eventos al servidor y podremos escucharlos en el servidor cuando se reciba la conexion. La informacion se recibe como argumento del evento 'connection' de io en backend

let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", (e) => {
  //mandar datos al servidor dandole el nombre al evento emitido de chat:message
  socket.emit("chat:message", {
    message: message.value,
    username: username.value,
  });
  message.value = "";
  // actions.innerHTML = "";
});

message.addEventListener("keypress", (e) => {
  //envio el value en vez de un callback
  socket.emit("chat:typing", username.value);
});

//escuchar servidor
socket.on("chat:message", (data) => {
  actions.innerHTML = "";
  output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
  // actions.style.display = "block";
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<em>${data}</em> is typing...`;
});
