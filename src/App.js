import React from "react";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceive, setMessageReceive] = useState("");
  const [room, setRoom] = useState("");

  const handleJoin = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data receive: ", data);
      setMessageReceive(data);
    });
  }, [socket]);

  return (
    <div>
      <input
        placeholder="Join room "
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>

      <input
        placeholder="Send message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>Message: {messageReceive}</div>
    </div>
  );
}

export default App;
