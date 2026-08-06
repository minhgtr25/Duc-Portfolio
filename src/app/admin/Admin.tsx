import { useState } from 'react';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { useData } from '../context/DataContext';
import { toast } from 'sonner';

export function Admin() {
  const { data, isLoading } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });

  const handleLogin = (password: string) => {
    if (isLoading) {
      toast.warning('Đang tải dữ liệu, vui lòng thử lại sau giây lát.');
      return;
    }
    
    const correctPassword = data.adminPassword || '123';
    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      toast.success('Đăng nhập thành công!');
    } else {
      toast.error('Mật khẩu không chính xác!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    toast.info('Đã đăng xuất.');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
