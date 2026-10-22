import type { User } from "../types";
import Axios from "axios"

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function getProfile(token: string): Promise<User> {
  // TODO: запросить GET /users/me (Fetch) с заголовком Authorization Bearer <token>, вернуть профиль
  const result = await Fetch(`${API_URL}/users/me`,
    {headers: authHeaders(token)}
  );
  if (!result.ok) {
    throw new Error(`${result.status}`);
  }
  return result.json();
}

export type UpdateProfilePayload = Partial<Pick<User, "nickname" | "bio">>;

export async function updateProfile(token: string, { nickname, bio }: UpdateProfilePayload): Promise<User> {
  // TODO: опционально отправить PUT /users/me (Fetch или Axios) с { nickname, bio } и заголовком Authorization
  // Вернуть обновленный профиль
  return Promise.reject(new Error("Not implemented"));
}
