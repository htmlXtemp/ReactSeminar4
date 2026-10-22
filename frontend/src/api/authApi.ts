import type { User } from "../types";
import Axios from "axios"

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

export type LoginPayload = {
  phone: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export async function login({ phone, password }: LoginPayload): Promise<LoginResponse> {
  // TODO: отправить POST /auth/login (Axios) с телефоном и паролем, вернуть { token, user }
  // Подставляйте URL из env: API_URL + "/auth/login"
  // Не сохраняйте токен здесь — только верните данные
  const result = await Axios.post<LoginResponse>(`${API_URL}/auth/login`, {phone, password});
  return result.data();
}
