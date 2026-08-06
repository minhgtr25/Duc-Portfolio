import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'motion/react';
import { defaultData } from '../data/defaultData';
import { ExperienceAdmin } from './sections/ExperienceAdmin';
import { DemosAdmin } from './sections/DemosAdmin';
import { ProjectsAdmin } from './sections/ProjectsAdmin';
import { ServicesAdmin } from './sections/ServicesAdmin';
import { GalleryAdmin } from './sections/GalleryAdmin';

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data, updateData, isLoading } = useData();
  const [formData, setFormData] = useState(data);

  // Sync formData with actual data loaded from Supabase/LocalStorage
  useEffect(() => {
    if (!isLoading && data) {
      setFormData(data);
    }
  }, [data, isLoading]);

  const handleSave = async () => {
    try {
      await updateData(formData);
      alert('Đã lưu thay đổi thành công! (Dữ liệu đã được cập nhật)');
    } catch (error) {
      alert('Lỗi khi lưu dữ liệu!');
    }
  };

  const handleReset = () => {
    if(confirm('Bạn có chắc chắn muốn khôi phục dữ liệu gốc không?')) {
      setFormData(defaultData);
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
      <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <button onClick={handleReset} className="px-3 md:px-4 py-2 text-sm md:text-base bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600/30 transition-colors">Khôi phục gốc</button>
          <button onClick={handleSave} className="px-3 md:px-4 py-2 text-sm md:text-base bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.4)]">Lưu thay đổi</button>
          <button onClick={onLogout} className="px-3 md:px-4 py-2 text-sm md:text-base bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">Đăng xuất</button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8 max-w-5xl space-y-8">
        
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-4 md:p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Tiêu đề chính</label>
              <input type="text" value={formData.hero.text} onChange={e => handleChange('hero', 'text', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Phụ đề</label>
              <input type="text" value={formData.hero.subtitle} onChange={e => handleChange('hero', 'subtitle', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-4 md:p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">About Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Tiêu đề</label>
              <input type="text" value={formData.about.title} onChange={e => handleChange('about', 'title', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Đoạn văn giới thiệu chính</label>
              <textarea value={formData.about.paragraphs[0]} onChange={e => {
                  const newParas = [...formData.about.paragraphs];
                  newParas[0] = e.target.value;
                  handleChange('about', 'paragraphs', newParas);
                }} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white h-24 md:h-32" />
            </div>
          </div>
        </motion.div>

        {/* Array Sections from Components */}
        <ProjectsAdmin data={formData.projects} onChange={(newData) => handleSectionChange('projects', newData)} />
        <DemosAdmin data={formData.demos} onChange={(newData) => handleSectionChange('demos', newData)} />
        <ServicesAdmin data={formData.services} onChange={(newData) => handleSectionChange('services', newData)} />
        <ExperienceAdmin data={formData.experiences} onChange={(newData) => handleSectionChange('experiences', newData)} />
        <GalleryAdmin data={formData.gallery} onChange={(newData) => handleSectionChange('gallery', newData)} />

        {/* Contact Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-4 md:p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Contact Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Tiêu đề liên hệ</label>
              <input type="text" value={formData.contact.title} onChange={e => handleChange('contact', 'title', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Email</label>
              <input type="text" value={formData.contact.email} onChange={e => handleChange('contact', 'email', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Facebook Link</label>
              <input type="text" value={formData.contact.facebook} onChange={e => handleChange('contact', 'facebook', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Instagram Link</label>
              <input type="text" value={formData.contact.instagram} onChange={e => handleChange('contact', 'instagram', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
