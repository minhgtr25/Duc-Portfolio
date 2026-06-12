import { motion } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';

export function ServicesAdmin({ data, onChange }: { data: any[], onChange: (newData: any[]) => void }) {
  const handleAddService = () => {
    onChange([
      ...data,
      {
        icon: "Music",
        title: "DỊCH VỤ MỚI",
        description: "Mô tả chi tiết về dịch vụ..."
      }
    ]);
  };

  const handleRemoveService = (index: number) => {
    if(confirm('Bạn có chắc chắn muốn xoá Dịch vụ này?')) {
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
        <h2 className="text-xl font-bold">Services Section</h2>
        <button 
          onClick={handleAddService}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm Dịch Vụ
        </button>
      </div>

      <div className="space-y-6">
        {data.map((service, index) => (
          <div key={index} className="p-4 border border-zinc-800 rounded-lg space-y-4 relative group">
            <button 
              onClick={() => handleRemoveService(index)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors"
              title="Xoá Dịch vụ này"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <h3 className="font-semibold text-zinc-300 pr-10">Dịch vụ: {service.title}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Tên dịch vụ</label>
                <input type="text" value={service.title} onChange={e => handleChange(index, 'title', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Icon (Biểu tượng)</label>
                <select 
                  value={service.icon} 
                  onChange={e => handleChange(index, 'icon', e.target.value)} 
                  className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white appearance-none"
                >
                  <option value="Music">Music (Nốt nhạc)</option>
                  <option value="AudioWaveform">AudioWaveform (Sóng âm)</option>
                  <option value="Mic">Mic (Microphone)</option>
                  <option value="Headphones">Headphones (Tai nghe)</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Mô tả</label>
                <textarea value={service.description} onChange={e => handleChange(index, 'description', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white h-20" />
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center text-zinc-500 py-8 border border-dashed border-zinc-800 rounded-lg">
            Chưa có Dịch vụ nào. Hãy thêm mới!
          </div>
        )}
      </div>
    </motion.div>
  );
}
