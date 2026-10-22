import React, { useEffect, useState } from "react";
import type { Message } from "../types";
import { getMessages, sendMessage } from "../api/messageApi";
import { connectSocket } from "../api/socketClient";
import { handleError } from "../helpers/handleError";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

type Props = {
  token: string;
};

export function ChatPage({ token }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [socketStatus, setSocketStatus] = useState<string>("disconnected");

  const addMessage = (message: Message) => {
    setMessages((prev) =>
      prev.some((item) => item.id === message.id) ? prev : [...prev, message]
    );
  };

  useEffect(() => {
    let cancelled = false;

    const loadHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const history = await getMessages(token);
        if (!cancelled) {
          setMessages(history);
        }
      } catch (err) {
        if (!cancelled) {
          setError(handleError(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadHistory();

    const socket = connectSocket(token, {
      onStatus: (status) => {
        if (!cancelled) {
          setSocketStatus(status);
        }
      },
      onMessage: (message) => {
        if (!cancelled) {
          addMessage(message);
        }
      }
    });

    return () => {
      cancelled = true;
      socket.disconnect();
    };
  }, [token]);

  const handleSend = async (text: string) => {
    setError("");
    try {
      const created = await sendMessage(token, text);
      addMessage(created);
    } catch (err) {
      setError(handleError(err));
    }
  };

  const isConnected = socketStatus === "connected";

  return (
    <div>
      <h2>Чат</h2>
      <p>Статус сокета: {socketStatus}</p>
      {loading ? <p>Загрузка сообщений...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} disabled={!isConnected} />
    </div>
  );
}

export default ChatPage;
