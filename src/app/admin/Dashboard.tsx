import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import { defaultData } from '../data/defaultData';
import { ExperienceAdmin } from './sections/ExperienceAdmin';
import { DemosAdmin } from './sections/DemosAdmin';
import { ProjectsAdmin } from './sections/ProjectsAdmin';
import { ServicesAdmin } from './sections/ServicesAdmin';
import { GalleryAdmin } from './sections/GalleryAdmin';
import { toast } from 'sonner';

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data, updateData, isLoading } = useData();
  const [formData, setFormData] = useState(data);

  // Modal display states
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Form states for dialog inputs
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState('');

  // Sync formData with actual data loaded from Supabase/LocalStorage
  useEffect(() => {
    if (!isLoading && data) {
      setFormData(data);
    }
  }, [data, isLoading]);

  const confirmSave = async () => {
    setShowSaveConfirm(false);
    try {
      await updateData(formData);
      toast.success('Đã lưu toàn bộ thay đổi thành công!');
    } catch (error) {
      toast.error('Lỗi khi lưu dữ liệu!');
    }
  };

  const confirmReset = async () => {
    const correctPassword = data.adminPassword || '123';
    if (resetPasswordConfirm !== correctPassword) {
      toast.error('Mật khẩu Admin xác nhận không đúng!');
      return;
    }

    try {
      await updateData(defaultData);
      setFormData(defaultData);
      toast.success('Khôi phục cài đặt gốc thành công!');
      setShowResetConfirm(false);
      setResetPasswordConfirm('');
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi khôi phục!');
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = data.adminPassword || '123';

    if (passwordForm.oldPassword !== correctPassword) {
      toast.error('Mật khẩu hiện tại không đúng!');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }

    if (passwordForm.newPassword.length < 3) {
      toast.error('Mật khẩu mới phải dài từ 3 ký tự trở lên!');
      return;
    }

    try {
      const updatedData = {
        ...formData,
        adminPassword: passwordForm.newPassword
      };
      await updateData(updatedData);
      setFormData(updatedData);
      toast.success('Đổi mật khẩu truy cập Admin thành công!');
      setShowChangePassword(false);
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Lỗi khi cập nhật mật khẩu mới!');
    }
  };

  const handleChange = (section: keyof typeof formData, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSectionChange = (section: keyof typeof formData, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-emerald-500 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-zinc-400">Đang tải dữ liệu từ cơ sở dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-100">Admin Dashboard</h1>
          <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full border border-zinc-700/50">v1.1</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          <button 
            onClick={() => setShowChangePassword(true)} 
            className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors cursor-pointer"
          >
            Đổi mật khẩu
          </button>
          <button 
            onClick={() => setShowResetConfirm(true)} 
            className="px-3 py-1.5 text-xs font-medium bg-red-950/30 text-red-400 border border-red-900/30 rounded-lg hover:bg-red-900/30 transition-colors cursor-pointer"
          >
            Khôi phục gốc
          </button>
          <button 
            onClick={() => setShowSaveConfirm(true)} 
            className="px-4 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
          >
            Lưu thay đổi
          </button>
          <button 
            onClick={onLogout} 
            className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8 max-w-5xl space-y-8">
        
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900/50 border border-zinc-800/80 p-5 md:p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-zinc-200">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Tiêu đề chính</label>
              <input 
                type="text" 
                value={formData.hero.text} 
                onChange={e => handleChange('hero', 'text', e.target.value)} 
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-4 py-2.5 text-sm text-zinc-100 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Phụ đề</label>
              <input 
                type="text" 
                value={formData.hero.subtitle} 
                onChange={e => handleChange('hero', 'subtitle', e.target.value)} 
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-4 py-2.5 text-sm text-zinc-100 outline-none transition-all" 
              />
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900/50 border border-zinc-800/80 p-5 md:p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-zinc-200">About Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Tiêu đề</label>
              <input 
                type="text" 
                value={formData.about.title} 
                onChange={e => handleChange('about', 'title', e.target.value)} 
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-4 py-2.5 text-sm text-zinc-100 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Đoạn văn giới thiệu chính</label>
              <textarea 
                value={formData.about.paragraphs[0] || ''} 
                onChange={e => {
                  const newParas = [...formData.about.paragraphs];
                  newParas[0] = e.target.value;
                  handleChange('about', 'paragraphs', newParas);
                }} 
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-4 py-2.5 text-sm text-zinc-100 outline-none transition-all h-28 md:h-36 resize-y" 
              />
            </div>
          </div>
        </motion.div>

        {/* Dynamic sub-sections */}
        <ProjectsAdmin data={formData.projects} onChange={(newData) => handleSectionChange('projects', newData)} />
        <DemosAdmin data={formData.demos} onChange={(newData) => handleSectionChange('demos', newData)} />
        <ServicesAdmin data={formData.services} onChange={(newData) => handleSectionChange('services', newData)} />
        <ExperienceAdmin data={formData.experiences} onChange={(newData) => handleSectionChange('experiences', newData)} />
        <GalleryAdmin data={formData.gallery} onChange={(newData) => handleSectionChange('gallery', newData)} />

        {/* Contact Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900/50 border border-zinc-800/80 p-5 md:p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-zinc-200">Contact Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Tiêu đề liên hệ</label>
              <input 
                type="text" 
                value={formData.contact.title} 
                onChange={e => handleChange('contact', 'title', e.target.value)} 
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-4 py-2.5 text-sm text-zinc-100 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Email</label>
              <input 
                type="text" 
                value={formData.contact.email} 
                onChange={e => handleChange('contact', 'email', e.target.value)} 
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-4 py-2.5 text-sm text-zinc-100 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Facebook Link</label>
              <input 
                type="text" 
                value={formData.contact.facebook} 
                onChange={e => handleChange('contact', 'facebook', e.target.value)} 
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-4 py-2.5 text-sm text-zinc-100 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Instagram Link</label>
              <input 
                type="text" 
                value={formData.contact.instagram} 
                onChange={e => handleChange('contact', 'instagram', e.target.value)} 
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-4 py-2.5 text-sm text-zinc-100 outline-none transition-all" 
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* MODALS & OVERLAYS */}
      
      {/* Save Confirmation Modal */}
      <AnimatePresence>
        {showSaveConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-zinc-100">Xác nhận thay đổi?</h3>
                <p className="text-sm text-zinc-400">Bạn có chắc chắn muốn lưu toàn bộ các thay đổi này lên cơ sở dữ liệu?</p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowSaveConfirm(false)}
                  className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer text-zinc-300"
                >
                  Hủy
                </button>
                <button 
                  type="button" 
                  onClick={confirmSave}
                  className="px-4 py-2 text-sm font-medium bg-emerald-650 hover:bg-emerald-600 rounded-lg transition-colors text-white cursor-pointer"
                >
                  Đồng ý
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-red-500">Bạn đã chắc chắn xóa?</h3>
                <p className="text-sm text-zinc-400">
                  Hành động này sẽ khôi phục cài đặt gốc và <strong>xóa toàn bộ các dữ liệu tùy chỉnh</strong> trên website của bạn.
                </p>
              </div>
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Nhập mật khẩu Admin để xác nhận:
                  </label>
                  <input 
                    type="password" 
                    required
                    value={resetPasswordConfirm}
                    onChange={e => setResetPasswordConfirm(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none transition-all"
                    placeholder="Nhập mật khẩu truy cập..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowResetConfirm(false);
                      setResetPasswordConfirm('');
                    }}
                    className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer text-zinc-300"
                  >
                    Hủy
                  </button>
                  <button 
                    type="button" 
                    onClick={confirmReset}
                    className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-white cursor-pointer"
                  >
                    Khôi phục gốc
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showChangePassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-zinc-100">Đổi mật khẩu truy cập Admin</h3>
                <p className="text-xs text-zinc-400">Thay đổi mật khẩu đăng nhập vào bảng điều khiển Admin.</p>
              </div>
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Mật khẩu cũ</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.oldPassword} 
                    onChange={e => setPasswordForm(p => ({ ...p, oldPassword: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Mật khẩu mới</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.newPassword} 
                    onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Xác nhận mật khẩu mới</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.confirmPassword} 
                    onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none transition-all"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowChangePassword(false);
                      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer text-zinc-300"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors text-white cursor-pointer"
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
