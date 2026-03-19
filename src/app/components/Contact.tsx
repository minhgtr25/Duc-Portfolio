import { motion } from "motion/react";
import { Mail, Instagram, Facebook } from "lucide-react";

export function Contact() {
  return (
    <section className="min-h-screen bg-black text-white py-20 flex items-center">
      <div className="container mx-auto px-6 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl tracking-tight mb-8">
            SÁNG TẠO CÙNG TÔI.
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-px bg-white w-64 mx-auto mb-12"
          />

          <motion.a
            href="mailto:luuanhduc2002@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-2xl md:text-3xl tracking-wide hover:text-gray-300 transition-colors mb-16"
          >
            <Mail className="w-8 h-8" />
            luuanhduc2002@gmail.com
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 mb-20"
          >
            {[
              { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/luuduc123" },
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/luu.ducc/" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 tracking-widest"
          >
            © 2026 LƯU ANH ĐỨC. ALL RIGHTS RESERVED.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
