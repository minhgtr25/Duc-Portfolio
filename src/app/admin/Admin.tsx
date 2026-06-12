import { useState } from 'react';
import { Login } from './Login';
import { Dashboard } from './Dashboard';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });

  const handleLogin = (password: string) => {
    if (password === '123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      alert('Sai mật khẩu!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
