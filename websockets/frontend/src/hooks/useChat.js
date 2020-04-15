import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:3001");

    socket.current.on("new msg", (message) =>
      setMessages((messages) => [...messages, message])
    );

    return () => socket.current.disconnect();
  }, []);

  const sendMessage = (message) => {
    socket.current.emit("new msg", message);
  };

  return { messages, sendMessage };
};

export default useChat;
