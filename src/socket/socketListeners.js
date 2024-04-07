
/**
 * Listener para eventos enviados por el servidor
 */

export default function socketListeners(socket, setSocket){
    socket.on("connect", () => { //Listener para el evento predefinido de conexión.
        console.log(socket.id);
      });

    socket.on("message", (message) => { //Listener para el evento "message" que muestra el contenido recibido
    console.log(message);
    })

    socket.on("disconnect", () => { //Listener para el evento predefinido de desconexión
    console.log('Se ha desconectado del servidor');
    setSocket(undefined);
    });
}