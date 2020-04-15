import React, { useState } from "react";
import { TextField } from "@material-ui/core";

const MessageContainer = ({ onSendMessage: pushSendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <TextField
      fullWidth
      multiline
      label="Message"
      margin="normal"
      rows="4"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          pushSendMessage(message);
          setMessage("");
        }
      }}
    />
  );
};

export default MessageContainer;
