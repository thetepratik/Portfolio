import { createContext, useContext, useState } from 'react';

// ── Change these credentials to your own ──
const ADMIN_ID = 'pratik';
const ADMIN_PASSWORD = 'admin@123';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('adminAuth') === 'true'
  );
  const [error, setError] = useState('');

  const login = (id, password) => {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
      return true;
    } else {
      setError('Invalid credentials. Please try again.');
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
