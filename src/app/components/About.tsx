import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useData } from "../context/DataContext";

export function About() {
  const { data } = useData();
  const { title, paragraphs, stats, image } = data.about;

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
            <h2 className="text-5xl md:text-6xl tracking-tight">{title}</h2>
            <div className="h-px bg-black w-32" />
            
            {paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-gray-700 leading-relaxed text-justify">
                {p}
              </p>
            ))}

            <div className="flex gap-8 pt-6">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl tracking-tight">{stat.value}</div>
                  <div className="text-sm text-gray-500 tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
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
