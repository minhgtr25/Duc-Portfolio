import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import aboutImg from "/img/about.jpg";

export function About() {
  return (
    <section className="min-h-screen bg-white text-black py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl tracking-tight">ABOUT</h2>
            <div className="h-px bg-black w-32" />
            <p className="text-lg text-gray-700 leading-relaxed">
              Tôi tên là Lưu Anh Đức - Một Guitarist, Music Arranger hiện đang
              sinh sống và làm việc tại Hà Nội.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Tôi đã có hơn 6 năm kinh nghiệm biểu diễn trên sân khấu và 1 năm
              kinh nghiệm trong Music Arranger, hiện đang theo đuổi con đường âm
              nhạc một cách nghiêm túc và lâu dài. Là một người trẻ đam mê âm
              nhạc, tôi mong muốn trở thành một Music Producer có khả năng làm
              việc đa nhiệm, kết hợp tốt giữa cảm xúc, kỹ thuật và tư duy nghệ
              thuật trong quá trình tạo ra sản phẩm.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Các điểm mạnh mà tôi tự tin là sự cẩn thận, nhạy cảm với âm thanh
              và cảm xúc, cùng tinh thần cầu tiến trong việc học hỏi kỹ thuật
              sản xuất. Tôi đề cao tinh thần trách nhiệm, luôn sẵn sàng thay đổi
              và không ngừng hoàn thiện bản thân để theo kịp xu hướng và giữ
              được màu sắc riêng trong âm nhạc.
            </p>
            <div className="flex gap-8 pt-6">
              <div>
                <div className="text-4xl tracking-tight">30+</div>
                <div className="text-sm text-gray-500 tracking-wider">
                  PROJECTS
                </div>
              </div>
              <div>
                <div className="text-4xl tracking-tight">10+</div>
                <div className="text-sm text-gray-500 tracking-wider">
                  ARTISTS
                </div>
              </div>
              <div>
                <div className="text-4xl tracking-tight">1+</div>
                <div className="text-sm text-gray-500 tracking-wider">
                  YEARS
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400" />
            <ImageWithFallback
              src={aboutImg}
              alt="Studio setup"
              className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
