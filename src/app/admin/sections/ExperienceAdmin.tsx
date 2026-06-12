import { motion } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';

export function ExperienceAdmin({ data, onChange }: { data: any[], onChange: (newData: any[]) => void }) {
  const handleAddExperience = () => {
    onChange([
      ...data,
      {
        year: "Năm mới",
        role: "Vai trò mới",
        company: "Công ty mới",
        description: "Mô tả...",
        achievements: ["Thành tựu 1"]
      }
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    if(confirm('Bạn có chắc chắn muốn xoá kinh nghiệm này?')) {
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

  const handleAchievementChange = (expIndex: number, achIndex: number, value: string) => {
    const newData = [...data];
    const newAchievements = [...newData[expIndex].achievements];
    newAchievements[achIndex] = value;
    newData[expIndex] = { ...newData[expIndex], achievements: newAchievements };
    onChange(newData);
  };

  const handleAddAchievement = (expIndex: number) => {
    const newData = [...data];
    const newAchievements = [...newData[expIndex].achievements, "Thành tựu mới"];
    newData[expIndex] = { ...newData[expIndex], achievements: newAchievements };
    onChange(newData);
  };

  const handleRemoveAchievement = (expIndex: number, achIndex: number) => {
    const newData = [...data];
    const newAchievements = [...newData[expIndex].achievements];
    newAchievements.splice(achIndex, 1);
    newData[expIndex] = { ...newData[expIndex], achievements: newAchievements };
    onChange(newData);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Experience Section</h2>
        <button 
          onClick={handleAddExperience}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm Kinh Nghiệm
        </button>
      </div>

      <div className="space-y-6">
        {data.map((exp, index) => (
          <div key={index} className="p-4 border border-zinc-800 rounded-lg space-y-4 relative group">
            <button 
              onClick={() => handleRemoveExperience(index)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors"
              title="Xoá kinh nghiệm này"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <h3 className="font-semibold text-zinc-300 pr-10">Kinh nghiệm {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Thời gian</label>
                <input type="text" value={exp.year} onChange={e => handleChange(index, 'year', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Vai trò</label>
                <input type="text" value={exp.role} onChange={e => handleChange(index, 'role', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Công ty / Tổ chức</label>
                <input type="text" value={exp.company} onChange={e => handleChange(index, 'company', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Mô tả ngắn</label>
                <input type="text" value={exp.description} onChange={e => handleChange(index, 'description', e.target.value)} className="w-full bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-white" />
              </div>
            </div>

            {/* Achievements */}
            <div className="pt-4 border-t border-zinc-800/50">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-300">Các thành tựu / công việc chi tiết:</label>
                <button 
                  onClick={() => handleAddAchievement(index)}
                  className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Thêm đầu mục
                </button>
              </div>
              <div className="space-y-2">
                {exp.achievements.map((ach: string, achIndex: number) => (
                  <div key={achIndex} className="flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full shrink-0" />
                    <input 
                      type="text" 
                      value={ach} 
                      onChange={e => handleAchievementChange(index, achIndex, e.target.value)} 
                      className="w-full bg-zinc-800/50 px-3 py-1.5 text-sm rounded border border-transparent focus:border-zinc-700 focus:outline-none focus:bg-zinc-800" 
                    />
                    <button 
                      onClick={() => handleRemoveAchievement(index, achIndex)}
                      className="text-zinc-600 hover:text-red-500 p-1 transition-colors"
                      title="Xoá đầu mục"
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
            Chưa có kinh nghiệm nào. Hãy thêm mới!
          </div>
        )}
      </div>
    </motion.div>
  );
}
