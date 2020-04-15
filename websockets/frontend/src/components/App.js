import React from "react";

import useChat from "../hooks/useChat";
import MessageContainer from "./MessageContainer";
import Messages from "./Messages";

function App() {
  const { messages, sendMessage } = useChat();

  return (
    <div>
      <Messages messages={messages} />
      <MessageContainer
        onSendMessage={(message) => {
          sendMessage(message);
        }}
      />
    </div>
  );
}

export default App;
