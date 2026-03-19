import { motion } from "motion/react";

const experiences = [
  {
    year: "2025 - NAY",
    role: "FOUNDER - CO-LEADER",
    company: "410 Studio",
    description: "Tổ hợp sản xuất âm nhạc, thu âm, hoà âm phối khí tại Hà Nội.",
    achievements: [
      "Cung cấp các dịch vụ thu âm, sản xuất âm nhạc",
      "Giá cả cạnh tranh, hướng đến đối tượng trẻ, âm nhạc tươi mới",
      "Sản xuất các sản phẩm TVC, lồng tiếng, nhạc phim cho các dự án lớn nhỏ",
    ],
  },
  {
    year: "2025 - NAY",
    role: "MUSIC PRODUCER",
    company: "90DEGREE MUSIC LAB",
    description:
      "Làm việc với đội ngũ âm thanh chất lượng, tạo ra sản phẩm âm nhạc chất lượng cao",
    achievements: [
      "Giao lưu, học hỏi với các producer nổi tiếng",
      "Tham gia trực tiếp vào quá trình sản xuất âm nhạc",
    ],
  },
  {
    year: "2023 - 2024",
    role: "MEDIA OFFICER",
    company: "TRUNG TÂM NGHỆ THUẬT MUSIC TALENT",
    description:
      "Quản lý và phát triển các nền tảng truyền thông số cho một dự án/đơn vị sáng tạo.",
    achievements: [
      "Quản lý nội dung trên Website, Facebook, YouTube",
      "Lên kịch bản, hỗ trợ quay và dựng video",
      "Theo dõi tương tác, hỗ trợ định hướng nội dung theo từng chiến dịch",
      "Tối ưu hóa nội dung để tăng độ phủ và giữ chân người xem",
    ],
  },
  {
    year: "2022 - 2023",
    role: "PRESIDENT",
    company: "FPTU - MELODY CLUB",
    description:
      "Giữ vai trò Chủ nhiệm CLB, điều hành hoạt động của hơn 200 thành viên.",
    achievements: [
      "Tổ chức thành công các sự kiện âm nhạc quy mô lớn, thu hút hàng trăm sinh viên tham gia",
      "Xây dựng và phát triển các chương trình đào tạo kỹ năng âm nhạc, thu hút sự quan tâm của đông đảo sinh viên",
      "Trưởng BTC các sự kiện âm nhạc quy mô lớn có sự tham gia của nghệ sĩ khách mời chuyên nghiệp",
      "Đại diện CLB làm việc với các đơn vị đối tác, nhà tài trợ",
      "Quản lý đội ngũ nội dung, truyền thông, âm thanh – ánh sáng và hậu cần sự kiện",
    ],
  },
];

export function Experience() {
  return (
    <section className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight mb-6">
            EXPERIENCE
          </h2>
          <div className="h-px bg-white w-32" />
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-l-2 border-white/20 pl-8 relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white rounded-full group-hover:scale-150 transition-transform duration-300" />

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <div className="text-sm tracking-widest text-gray-400 mb-2">
                      {exp.year}
                    </div>
                    <h3 className="text-2xl md:text-3xl tracking-tight mb-1">
                      {exp.role}
                    </h3>
                    <div className="text-lg text-gray-300">{exp.company}</div>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed max-w-3xl">
                  {exp.description}
                </p>

                <ul className="space-y-2 pt-2">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1 + i * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-sm text-gray-500"
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
