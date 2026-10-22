import React from "react";
import type { Message } from "../types";

type Props = {
  messages: Message[];
};

export function MessageList({ messages }: Props) {
  if (!messages?.length) {
    return <p>Нет сообщений</p>;
  }

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.author}</strong>
          <span> · {new Date(message.createdAt).toLocaleString()}</span>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
