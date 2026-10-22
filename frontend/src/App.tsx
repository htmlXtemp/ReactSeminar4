import React from "react";
import Profile from "./pages/ProfilePage";
import Login from "./pages/LoginPage";
import Chat from "./pages/ChatPage";
import { getToken, clearToken } from "./helpers/authStorage"
import type { User } from "./types";
export function App() {
  const read_token = getToken();
  const [token, setToken] = useState<string | null>(read_token);
  const [user, setUser] = useState<User | null>(null);
  // TODO: завести состояние для токена и активной вкладки (login | profile | chat)
  // TODO: реализовать обработчики входа/выхода, которые обновляют это состояние
  // TODO: отрисовать навигацию с тремя кнопками:
  //  - login доступна до авторизации (и активна по умолчанию)
  //  - profile и chat становятся активными только после успешного входа
  // TODO: выводить содержимое активной вкладки 
  // TODO: при наличии токена показывать кнопку "Выйти" в шапке
  return {
    <>
      <Login/>
      <Profile/>
      <Chat/>
    </>
  };
}

export default App;
