import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { getToken, clearToken } from "./helpers/authStorage";
import type { User } from "./types";

type Tab = "login" | "profile" | "chat";

export function App() {
  const [token, setToken] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<User | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>(() => (getToken() ? "chat" : "login"));

  const isAuthenticated = Boolean(token);

  const handleLogin = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    setActiveTab("chat");
  };

  const handleLogout = () => {
    clearToken();
    setToken(null);
    setUser(null);
    setActiveTab("login");
  };

  return (
    <div>
      <header>
        <h1>Messenger</h1>

        <nav>
          <button onClick={() => setActiveTab("login")} disabled={activeTab === "login"}>
            Вход
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            disabled={!isAuthenticated || activeTab === "profile"}
          >
            Профиль
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            disabled={!isAuthenticated || activeTab === "chat"}
          >
            Чат
          </button>
        </nav>

        {isAuthenticated ? <button onClick={handleLogout}>Выйти</button> : null}
      </header>

      <main>
        {activeTab === "login" && <LoginPage onLogin={handleLogin} />}
        {activeTab === "profile" && token && <ProfilePage token={token} />}
        {activeTab === "chat" && token && <ChatPage token={token} />}
      </main>
    </div>
  );
}

export default App;
