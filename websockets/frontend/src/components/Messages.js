import React from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

const Messages = ({ messages }) => {
  return (
    <List>
      {messages.flatMap((msg, idx) => [
        <ListItem key={idx} alignItems="flex-start">
          <ListItemText primary={msg} />
        </ListItem>,
        <Divider key={"d-" + idx} variant="inset" component="li" />,
      ])}
    </List>
  );
};

export default Messages;
