import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Tôi tên là Lưu Anh Đức - Guitarist, Music Arranger hiện đang sinh
              sống và làm việc tại Hà Nội.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Với hơn 6 năm kinh nghiệm trình diễn sân khấu cùng nền tảng vững
              chắc trong lĩnh vực phối khí (Music Arranging), tôi luôn nỗ lực
              định hình một tư duy âm nhạc chuyên nghiệp và khác biệt. Mục tiêu
              cốt lõi của tôi là trở thành một Music Producer đa năng – nơi sự
              nhạy bén về cảm xúc được cộng hưởng cùng kỹ thuật sản xuất hiện
              đại.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Tôi tin rằng giá trị của một sản phẩm âm nhạc nằm ở sự tỉ mỉ và
              khả năng cân bằng giữa cái tôi nghệ thuật với xu hướng thị trường.
              Với tinh thần trách nhiệm cao và sự thích nghi nhạy bén trước
              những thay đổi của thị trường, tôi cam kết là một đối tác tin cậy
              để bạn gửi gắm những dự án tâm huyết. Hãy cùng tôi tối ưu hóa các
              ý tưởng nghệ thuật để tạo ra những sản phẩm âm nhạc chất lượng,
              đáp ứng tốt nhất kỳ vọng của thị trường.
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
                <div className="text-4xl tracking-tight">2+</div>
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
              src="/img/about.jpg"
              alt="Studio setup"
              className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
