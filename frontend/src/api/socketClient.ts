import type { Message } from "../types";

const WS_URL = import.meta.env?.VITE_WS_URL || "ws://localhost:3001";

type SocketCallbacks = {
  onMessage?: (message: Message) => void;
  onStatus?: (status: string) => void;
};

export function connectSocket(token: string, { onMessage, onStatus }: SocketCallbacks) {
  const socket = new WebSocket(WS_URL);

  socket.addEventListener("open", () => {
    onStatus?.("connected");
  });

  socket.addEventListener("close", () => {
    onStatus?.("disconnected");
  });

  socket.addEventListener("error", () => {
    onStatus?.("error");
  });

  socket.addEventListener("message", (event) => {
    let data: { type: string; payload: unknown };
    try {
      data = JSON.parse(String(event.data)) as { type: string; payload: unknown };
    } catch {
      return;
    }

    if (data.type === "message:new") {
      onMessage?.(data.payload as Message);
    } else if (data.type === "error") {
      onStatus?.(`error: ${String(data.payload)}`);
    }
  });

  return {
    sendMessage: (text: string) => {
      if (!text || socket.readyState !== WebSocket.OPEN) {
        return;
      }
      socket.send(JSON.stringify({ type: "message:send", payload: { text, token } }));
    },
    disconnect: () => {
      socket.close();
    }
  };
}
