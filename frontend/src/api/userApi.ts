import type { User } from "../types";
import Axios from "axios";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function getProfile(token: string): Promise<User> {
  const result = await fetch(`${API_URL}/users/me`, {
    headers: authHeaders(token)
  });

  if (!result.ok) {
    const error = await result.json().catch(() => null);
    throw new Error(error?.message ?? `Ошибка запроса (${result.status})`);
  }

  return result.json();
}

export type UpdateProfilePayload = Partial<Pick<User, "nickname" | "bio">>;

export async function updateProfile(
  token: string,
  { nickname, bio }: UpdateProfilePayload
): Promise<User> {
  const result = await Axios.put<User>(
    `${API_URL}/users/me`,
    { nickname, bio },
    { headers: authHeaders(token) }
  );
  return result.data;
}
