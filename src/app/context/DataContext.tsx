import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultData } from '../data/defaultData';
import { supabase } from '../../lib/supabase';

type DataContextType = {
  data: typeof defaultData;
  updateData: (newData: typeof defaultData) => Promise<void>;
  isLoading: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<typeof defaultData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      // Nếu chưa có cấu hình Supabase, dùng dữ liệu mặc định / localStorage
      if (!import.meta.env.VITE_SUPABASE_URL) {
        const saved = localStorage.getItem('portfolioData');
        if (saved) setData(JSON.parse(saved));
        setIsLoading(false);
        return;
      }

      try {
        const { data: dbData, error } = await supabase
          .from('settings')
          .select('data')
          .eq('id', 1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No rows returned, let's insert default data
            await supabase.from('settings').insert([{ id: 1, data: defaultData }]);
          } else {
            console.error("Supabase Error:", error);
          }
        } else if (dbData && dbData.data) {
          setData(dbData.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu từ Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const updateData = async (newData: typeof defaultData) => {
    setData(newData);
    
    // Fallback localStorage if no Supabase
    if (!import.meta.env.VITE_SUPABASE_URL) {
      localStorage.setItem('portfolioData', JSON.stringify(newData));
      return;
    }

    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ id: 1, data: newData });
        
      if (error) throw error;
    } catch (err) {
      console.error("Lỗi khi lưu dữ liệu lên Supabase:", err);
      alert("Đã xảy ra lỗi khi lưu lên Supabase, vui lòng kiểm tra console.");
    }
  };

  return (
    <DataContext.Provider value={{ data, updateData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
