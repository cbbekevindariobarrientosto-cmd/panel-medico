import { useState } from 'react';
import { login } from '../api/auth.js';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('paciente@demo.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { token, user } = await login(email, password);
      onLogin(token, user);
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Panel Médico Personal</h1>
      <p className="subtitle">Ingresa para ver tus datos médicos.</p>

      <form onSubmit={handleSubmit} className="card">
        <label>
          Correo
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
