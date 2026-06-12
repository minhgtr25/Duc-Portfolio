import { useState } from 'react';
import { motion } from 'motion/react';

export function Login({ onLogin }: { onLogin: (password: string) => void }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
      >
        <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">ADMIN LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu..."
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-white transition-colors"
          />
          <button 
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Đăng Nhập
          </button>
        </form>
      </motion.div>
    </div>
  );
}
