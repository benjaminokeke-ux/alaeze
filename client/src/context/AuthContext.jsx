import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('alaeze_token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchUser() {
    try {
      const { data } = await api.get('/api/auth/me');
      setUser(data.user);
    } catch {
      localStorage.removeItem('alaeze_token');
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('alaeze_token', data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(userData) {
    const { data } = await api.post('/api/auth/register', userData);
    localStorage.setItem('alaeze_token', data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem('alaeze_token');
    setUser(null);
  }

  async function updateProfile(updates) {
    const { data } = await api.put('/api/auth/profile', updates);
    setUser(data.user);
    return data.user;
  }

  async function enableCreatorMode() {
    const { data } = await api.put('/api/auth/profile', { creatorEnabled: true, accountType: 'both' });
    setUser(data.user);
    return data.user;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, enableCreatorMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
