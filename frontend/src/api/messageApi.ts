import type { Message } from "../types";
import Axios from "axios";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function getMessages(token: string): Promise<Message[]> {
  const result = await fetch(`${API_URL}/messages`, {
    headers: authHeaders(token)
  });

  if (!result.ok) {
    const error = await result.json().catch(() => null);
    throw new Error(error?.message ?? `Ошибка запроса (${result.status})`);
  }

  return result.json();
}

export async function sendMessage(token: string, text: string): Promise<Message> {
  const result = await Axios.post<Message>(
    `${API_URL}/messages`,
    { text },
    { headers: authHeaders(token) }
  );
  return result.data;
}
