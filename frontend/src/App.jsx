import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { getProfile } from './api/auth.js';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!token) return;
      try {
        const data = await getProfile(token);
        setUser(data.user);
      } catch {
        setToken(null);
        localStorage.removeItem("token");
      }
    }
    fetchData();
  }, [token]);

  const handleLogin = (tk, usr) => {
    setToken(tk);
    setUser(usr);
    localStorage.setItem("token", tk);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  if (!token || !user) return <LoginPage onLogin={handleLogin} />;

  return <HomePage user={user} onLogout={handleLogout} />;
}

export default App;
