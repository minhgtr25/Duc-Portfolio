import { motion } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';
import { SupabaseUpload } from '../components/SupabaseUpload';

export function GalleryAdmin({ data, onChange }: { data: any[], onChange: (newData: any[]) => void }) {
  const handleAddImage = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    onChange([
      ...data,
      {
        id: newId,
        src: "/img/about.jpg",
        alt: "New Image"
      }
    ]);
  };

  const handleRemoveImage = (index: number) => {
    if(confirm('Bạn có chắc chắn muốn xoá ảnh này?')) {
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
        <h2 className="text-xl font-bold">Gallery Section</h2>
        <button 
          onClick={handleAddImage}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm Ảnh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((image, index) => (
          <div key={image.id} className="p-4 border border-zinc-800 rounded-lg space-y-3 relative group">
            <button 
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 text-zinc-500 hover:text-red-500 bg-black/50 rounded-full p-1 transition-colors z-10"
              title="Xoá ảnh này"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="relative aspect-square rounded-md overflow-hidden bg-zinc-800">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Đường dẫn ảnh (URL)</label>
              <div className="flex gap-2 flex-col xl:flex-row">
                <input type="text" value={image.src} onChange={e => handleChange(index, 'src', e.target.value)} className="w-full bg-zinc-800 px-3 py-1.5 text-sm rounded border border-zinc-700 focus:outline-none focus:border-white" />
                <div className="w-full xl:w-28 shrink-0">
                  <SupabaseUpload 
                    folder="images" 
                    accept="image/*" 
                    label="Upload Ảnh" 
                    onUploadSuccess={(url) => handleChange(index, 'src', url)} 
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Mô tả (Alt text)</label>
              <input type="text" value={image.alt} onChange={e => handleChange(index, 'alt', e.target.value)} className="w-full bg-zinc-800 px-3 py-1.5 text-sm rounded border border-zinc-700 focus:outline-none focus:border-white" />
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <div className="text-center text-zinc-500 py-8 border border-dashed border-zinc-800 rounded-lg">
          Chưa có Ảnh nào. Hãy thêm mới!
        </div>
      )}
    </motion.div>
  );
}
