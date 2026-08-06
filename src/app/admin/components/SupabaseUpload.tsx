import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Loader2, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';

interface SupabaseUploadProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
}

export function SupabaseUpload({ onUploadSuccess, folder = 'uploads', accept = 'image/*,audio/*', label = 'Tải file lên' }: SupabaseUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if Supabase keys are configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      toast.error("Vui lòng cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env trước khi upload file!");
      return;
    }

    try {
      setIsUploading(true);
      toast.info('Đang bắt đầu tải file lên...');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('media') // Tên bucket trên Supabase
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
      
      onUploadSuccess(publicUrl);
      toast.success('Tải file lên thành công!');
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error('Lỗi upload file: ' + error.message);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className="relative inline-block w-full">
      <input 
        type="file" 
        accept={accept}
        onChange={handleUpload}
        disabled={isUploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <button 
        type="button"
        disabled={isUploading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-lg border border-zinc-700 transition-colors disabled:opacity-50"
      >
        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
        {isUploading ? 'Đang tải...' : label}
      </button>
    </div>
  );
}
