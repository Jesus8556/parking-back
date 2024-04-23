const { Server } = require("socket.io");

let io;

function iniciarSocket(server) {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Nueva conexión:", socket.id);

    // Puedes añadir eventos aquí
    socket.on("message", (data) => {
      console.log("Mensaje del cliente:", data);
      // Puedes realizar operaciones asincrónicas si es necesario
      socket.emit("response", "Mensaje recibido");
    });
  });

  return io;
}

function obtenerSocket() {
  if (!io) {
    throw new Error("Servidor de sockets no inicializado");
  }
  return io;
}

module.exports = {
  iniciarSocket: iniciarSocket,
  obtenerSocket: obtenerSocket,
};
