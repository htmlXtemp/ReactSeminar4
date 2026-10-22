import type { Message } from "../types";
import Axios from "axios"

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function getMessages(token: string): Promise<Message[]> {
  // TODO: запросить GET /messages (Fetch) с заголовком Authorization Bearer <token>, вернуть список сообщений
  const result = await fetch(`${API_URL}/messages`,
    {headers: authHeaders(token)}
  );
  if (!result.ok) {
    throw new Error(`${result.status}`);
    
  }
  return result.json();
}

export async function sendMessage(token: string, text: string): Promise<Message> {
  // TODO: отправить POST /messages (Axios) c { text } и заголовком Authorization, вернуть созданное сообщение
  const result = await Axios.post(`${API_URL}/messages`, {text}, {
    headers: authHeaders(token)
  });
  return result.data();
}
