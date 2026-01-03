import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginApi } from '../../api/authApi';
import './LoginPage.scss';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginApi(email, password);
      login(response.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    }
  };

  return (
    <div className="LoginPage">
      <div className="container">
        <div className="LoginPage__card">
          <h1 className="LoginPage__title">Login</h1>
          {error && <div className="LoginPage__error">{error}</div>}
          <form className="LoginPage__form" onSubmit={handleSubmit}>
            <div className="LoginPage__field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="LoginPage__field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="LoginPage__submit">Login</button>
          </form>
          <p className="LoginPage__footer">
            Don't have an account? <Link to="/registration">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
