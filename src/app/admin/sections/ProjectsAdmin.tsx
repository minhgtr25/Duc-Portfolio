import { motion } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';
import { SupabaseUpload } from '../components/SupabaseUpload';

export function ProjectsAdmin({ data, onChange }: { data: any[], onChange: (newData: any[]) => void }) {
  const handleAddProject = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    onChange([
      ...data,
      {
        id: newId,
        title: "Tên bài hát mới",
        artist: "Tên ca sĩ",
        category: "SINGLE",
        year: "2026",
        image: "/img/about.jpg",
        audioSrc: "",
        spotifyUrl: "",
        youtubeUrl: "",
        facebookUrl: "",
        role: "Producer"
      }
    ]);
  };

  const handleRemoveProject = (index: number) => {
    if(confirm('Bạn có chắc chắn muốn xoá Dự án này?')) {
      const newData = [...data];
      newData.splice(index, 1);
      onChange(newData);
    }
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Projects Section (Highlighted Works)</h2>
        <button 
          onClick={handleAddProject}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm Dự Án
        </button>
      </div>

      <div className="space-y-6">
        {data.map((project, index) => (
          <div key={project.id} className="p-4 border border-zinc-800 rounded-lg space-y-4 relative group">
            <button 
              onClick={() => handleRemoveProject(index)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors"
              title="Xoá Dự án này"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <h3 className="font-semibold text-zinc-300 pr-10">Dự án: {project.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Tên bài hát</label>
                <input type="text" value={project.title} onChange={e => handleChange(index, 'title', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Nghệ sĩ</label>
                <input type="text" value={project.artist} onChange={e => handleChange(index, 'artist', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Phân loại (VD: SINGLE, EP)</label>
                <input type="text" value={project.category} onChange={e => handleChange(index, 'category', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Năm phát hành</label>
                <input type="text" value={project.year} onChange={e => handleChange(index, 'year', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>

              {/* Hình ảnh */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm text-zinc-400 mb-1">Link Hình Ảnh Cover</label>
                <div className="flex gap-2">
                  <input type="text" value={project.image} onChange={e => handleChange(index, 'image', e.target.value)} className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
                  <div className="w-32">
                    <SupabaseUpload 
                      folder="images" 
                      accept="image/*" 
                      label="Upload Ảnh" 
                      onUploadSuccess={(url) => handleChange(index, 'image', url)} 
                    />
                  </div>
                </div>
              </div>

              {/* Audio */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm text-zinc-400 mb-1">Link File Nhạc (audioSrc)</label>
                <div className="flex gap-2">
                  <input type="text" value={project.audioSrc} onChange={e => handleChange(index, 'audioSrc', e.target.value)} className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
                  <div className="w-32">
                    <SupabaseUpload 
                      folder="audio" 
                      accept="audio/*" 
                      label="Upload Nhạc" 
                      onUploadSuccess={(url) => handleChange(index, 'audioSrc', url)} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Spotify URL</label>
                <input type="text" value={project.spotifyUrl || ''} onChange={e => handleChange(index, 'spotifyUrl', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">YouTube URL</label>
                <input type="text" value={project.youtubeUrl || ''} onChange={e => handleChange(index, 'youtubeUrl', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Facebook URL</label>
                <input type="text" value={project.facebookUrl || ''} onChange={e => handleChange(index, 'facebookUrl', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Vai trò của bạn (VD: Producer, Beat Maker)</label>
                <input type="text" value={project.role || ''} onChange={e => handleChange(index, 'role', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" placeholder="Ví dụ: Producer, Beat Maker, String Engineer" />
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center text-zinc-500 py-8 border border-dashed border-zinc-800 rounded-lg">
            Chưa có Dự án nào. Hãy thêm mới!
          </div>
        )}
      </div>
    </motion.div>
  );
}
