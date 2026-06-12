import { motion } from "motion/react";
import { useData } from "../context/DataContext";

export function Experience() {
  const { data } = useData();
  const experiences = data.experiences;

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
