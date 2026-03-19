import { motion } from 'motion/react';
import { Music, AudioWaveform, Mic, Headphones } from 'lucide-react';

const services = [
  {
    icon: Music,
    title: 'PRODUCTION',
    description: 'Trực tiếp lên ý tưởng, hoà âm phối khí và định hình màu sắc âm nhạc mang dấu ấn riêng cho dự án của bạn.'
  },
  {
    icon: AudioWaveform,
    title: 'MIXING',
    description: 'Trau chuốt, cân bằng các dải âm và sắc thái tự nhiên nhất, giúp truyền tải đúng cảm xúc mà bài hát muốn gửi gắm.'
  },
  {
    icon: Mic,
    title: 'RECORDING',
    description: 'Hỗ trợ thu âm vocal và nhạc cụ. Tôi luôn cố gắng tạo một không gian thoải mái nhất để nghệ sĩ được tự do thể hiện.'
  },
  {
    icon: Headphones,
    title: 'MASTERING',
    description: 'Hoàn thiện bản audio cuối cùng, đảm bảo bài hát nghe mượt mà và đạt âm lượng chuẩn trên mọi nền tảng phát hành.'
  }
];

export function Services() {
  return (
    <section className="min-h-screen bg-white text-black py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight mb-6">SERVICES</h2>
          <div className="h-px bg-black w-32" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden border border-gray-200 hover:border-black transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="mb-8 inline-block p-4 bg-gray-50 rounded-2xl group-hover:bg-white/10 group-hover:text-white transition-colors duration-500 self-start">
                  <service.icon className="w-8 h-8" />
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-2xl md:text-3xl tracking-tight mb-4 group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors duration-500 text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}