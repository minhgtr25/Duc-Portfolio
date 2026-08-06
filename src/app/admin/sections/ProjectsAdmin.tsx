import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { SupabaseUpload } from '../components/SupabaseUpload';

export function ProjectsAdmin({ data, onChange }: { data: any[], onChange: (newData: any[]) => void }) {
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragEnabledIndex, setDragEnabledIndex] = useState<number | null>(null);

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
    setExpandedIds(prev => ({ ...prev, [newId]: true }));
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

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newData = [...data];
    const target = newData[draggedIndex];
    newData.splice(draggedIndex, 1);
    newData.splice(index, 0, target);

    setDraggedIndex(index);
    setDragEnabledIndex(index);
    onChange(newData);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragEnabledIndex(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">Projects Section (Highlighted Works)</h2>
          <p className="text-xs text-zinc-400">Giữ chuột vào biểu tượng 6 chấm (grip) để kéo thả thay đổi thứ tự hiển thị.</p>
        </div>
        <button 
          onClick={handleAddProject}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:scale-[0.98] rounded-md text-sm transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Thêm Dự Án
        </button>
      </div>

      <div className="space-y-3">
        {data.map((project, index) => {
          const isExpanded = !!expandedIds[project.id];
          const isDragging = draggedIndex === index;

          return (
            <motion.div 
              key={project.id}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              draggable={dragEnabledIndex === index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`border rounded-lg transition-colors overflow-hidden ${
                isDragging 
                  ? 'border-green-500 bg-zinc-800/80 opacity-50' 
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
              }`}
            >
              {/* Header card */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer select-none gap-3"
                onClick={() => toggleExpand(project.id)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0" onClick={e => e.stopPropagation()}>
                  {/* Grip Handle */}
                  <div
                    onMouseDown={() => setDragEnabledIndex(index)}
                    onMouseLeave={() => setDragEnabledIndex(null)}
                    onMouseUp={() => setDragEnabledIndex(null)}
                    className="p-1 cursor-grab active:cursor-grabbing hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
                    title="Giữ và kéo để đổi thứ tự"
                  >
                    <GripVertical className="w-5 h-5" />
                  </div>
                  
                  {/* Number order */}
                  <span className="text-sm font-mono text-zinc-500 shrink-0 font-bold">
                    #{index + 1}
                  </span>
                  
                  {/* Summary info */}
                  <div 
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => toggleExpand(project.id)}
                  >
                    <h3 className="font-semibold text-zinc-200 truncate">
                      {project.title || "Tên bài hát mới"}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate">
                      {project.artist || "Tên ca sĩ"} • {project.category || "SINGLE"} ({project.year || "2026"}) • {project.role || "Producer"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => handleRemoveProject(index)}
                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                    title="Xoá Dự án này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => toggleExpand(project.id)}
                    className="p-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Form */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-zinc-800/80"
                  >
                    <div className="p-4 bg-zinc-900/30 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">Tên bài hát</label>
                          <input type="text" value={project.title} onChange={e => handleChange(index, 'title', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">Nghệ sĩ</label>
                          <input type="text" value={project.artist} onChange={e => handleChange(index, 'artist', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
                        </div>
                        
                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">Phân loại (VD: SINGLE, EP)</label>
                          <input type="text" value={project.category} onChange={e => handleChange(index, 'category', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">Năm phát hành</label>
                          <input type="text" value={project.year} onChange={e => handleChange(index, 'year', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
                        </div>

                        {/* Hình ảnh */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm text-zinc-400 mb-1">Link Hình Ảnh Cover</label>
                          <div className="flex gap-2">
                            <input type="text" value={project.image} onChange={e => handleChange(index, 'image', e.target.value)} className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
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
                            <input type="text" value={project.audioSrc} onChange={e => handleChange(index, 'audioSrc', e.target.value)} className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
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
                          <input type="text" value={project.spotifyUrl || ''} onChange={e => handleChange(index, 'spotifyUrl', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">YouTube URL</label>
                          <input type="text" value={project.youtubeUrl || ''} onChange={e => handleChange(index, 'youtubeUrl', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">Facebook URL</label>
                          <input type="text" value={project.facebookUrl || ''} onChange={e => handleChange(index, 'facebookUrl', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" />
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">Vai trò của bạn (VD: Producer, Beat Maker)</label>
                          <input type="text" value={project.role || ''} onChange={e => handleChange(index, 'role', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-zinc-100" placeholder="Ví dụ: Producer, Beat Maker, String Engineer" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        
        {data.length === 0 && (
          <div className="text-center text-zinc-500 py-8 border border-dashed border-zinc-800 rounded-lg">
            Chưa có Dự án nào. Hãy thêm mới!
          </div>
        )}
      </div>
    </motion.div>
  );
}
