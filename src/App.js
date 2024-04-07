import React, {useState, useEffect} from "react";
import { io } from "socket.io-client";
import SocketListener from "./socket/socketListeners";


function App() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if(socket) SocketListener(socket,setSocket);
  },[socket]);

  const handleConnectClick = () => {
    console.log('conexion');
    setSocket(io("http://localhost:5010/",{reconnection:false})); //Se realiza la conexión con el servidor. Se ha configurado el parametro "reconexion" en falso.
  };

  
  const handleMessageClick = () => {
    console.log('enviando evento mensaje');
    socket.emit('message', 'Mensaje desde cliente', resp => { //Se emite evento que hemos llamado "message", con una función callback en la que gestionamos un valor de respuesta
      if(resp.status === 200){
        console.log(resp.message)
      }
    });
  };

  const handleDisconnectClick = () => {
    console.log('Desconexión');
    socket.disconnect(); //Se realiza la desconexión del servidor
  };

  return (
    <div className="App">
     <button disabled={socket} onClick={handleConnectClick}>Conectar Websocket</button>
     <button disabled={!socket} onClick={handleMessageClick}>Emite evento "message"</button>
     <button disabled={!socket} onClick={handleDisconnectClick}>Desconectar Websocket</button>
    </div>
  );
}

export default App;
