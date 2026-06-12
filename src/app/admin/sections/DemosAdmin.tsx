import { motion } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';
import { SupabaseUpload } from '../components/SupabaseUpload';

export function DemosAdmin({ data, onChange }: { data: any[], onChange: (newData: any[]) => void }) {
  const handleAddDemo = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 100;
    onChange([
      ...data,
      {
        id: newId,
        title: "Tên Demo mới",
        linkDemo: "",
        audioSrc: "",
        info: [
          { label: "Dự kiến", value: "2026" },
          { label: "Vai trò", value: "Music Arranger" }
        ]
      }
    ]);
  };

  const handleRemoveDemo = (index: number) => {
    if(confirm('Bạn có chắc chắn muốn xoá Demo này?')) {
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

  const handleInfoChange = (demoIndex: number, infoIndex: number, field: string, value: string) => {
    const newData = [...data];
    const newInfo = [...newData[demoIndex].info];
    newInfo[infoIndex] = { ...newInfo[infoIndex], [field]: value };
    newData[demoIndex] = { ...newData[demoIndex], info: newInfo };
    onChange(newData);
  };

  const handleAddInfo = (demoIndex: number) => {
    const newData = [...data];
    const newInfo = [...newData[demoIndex].info, { label: "Label", value: "Value" }];
    newData[demoIndex] = { ...newData[demoIndex], info: newInfo };
    onChange(newData);
  };

  const handleRemoveInfo = (demoIndex: number, infoIndex: number) => {
    const newData = [...data];
    const newInfo = [...newData[demoIndex].info];
    newInfo.splice(infoIndex, 1);
    newData[demoIndex] = { ...newData[demoIndex], info: newInfo };
    onChange(newData);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Demos Section</h2>
        <button 
          onClick={handleAddDemo}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm Demo
        </button>
      </div>

      <div className="space-y-6">
        {data.map((demo, index) => (
          <div key={demo.id} className="p-4 border border-zinc-800 rounded-lg space-y-4 relative group">
            <button 
              onClick={() => handleRemoveDemo(index)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors"
              title="Xoá Demo này"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <h3 className="font-semibold text-zinc-300 pr-10">Demo: {demo.title}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Tên Demo</label>
                <input type="text" value={demo.title} onChange={e => handleChange(index, 'title', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Link Audio (audioSrc)</label>
                  <div className="flex gap-2">
                    <input type="text" value={demo.audioSrc} onChange={e => handleChange(index, 'audioSrc', e.target.value)} className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
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
                  <label className="block text-sm text-zinc-400 mb-1">Link Video / Mở Rộng</label>
                  <input type="text" value={demo.linkDemo} onChange={e => handleChange(index, 'linkDemo', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
                </div>
              </div>
            </div>

            {/* Info Array */}
            <div className="pt-4 border-t border-zinc-800/50">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-300">Các thông tin phụ (Thể loại, vai trò,...):</label>
                <button 
                  onClick={() => handleAddInfo(index)}
                  className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Thêm thông tin
                </button>
              </div>
              <div className="space-y-2">
                {demo.info.map((infoItem: any, infoIndex: number) => (
                  <div key={infoIndex} className="flex gap-2 items-center">
                    <input 
                      type="text" 
                      value={infoItem.label} 
                      onChange={e => handleInfoChange(index, infoIndex, 'label', e.target.value)} 
                      placeholder="Nhãn (VD: Thể loại)"
                      className="w-1/3 bg-zinc-800/50 px-3 py-1.5 text-sm rounded border border-transparent focus:border-zinc-700 focus:outline-none focus:bg-zinc-800" 
                    />
                    <input 
                      type="text" 
                      value={infoItem.value} 
                      onChange={e => handleInfoChange(index, infoIndex, 'value', e.target.value)} 
                      placeholder="Giá trị (VD: Pop Ballad)"
                      className="w-full bg-zinc-800/50 px-3 py-1.5 text-sm rounded border border-transparent focus:border-zinc-700 focus:outline-none focus:bg-zinc-800" 
                    />
                    <button 
                      onClick={() => handleRemoveInfo(index, infoIndex)}
                      className="text-zinc-600 hover:text-red-500 p-1 transition-colors"
                      title="Xoá thông tin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center text-zinc-500 py-8 border border-dashed border-zinc-800 rounded-lg">
            Chưa có Demo nào. Hãy thêm mới!
          </div>
        )}
      </div>
    </motion.div>
  );
}
