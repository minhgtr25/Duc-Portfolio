import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { useData } from "../context/DataContext";

export function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { data } = useData();
  const galleryImages = data.gallery;


  return (
    <section className="min-h-screen bg-white text-black py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight mb-6">GALLERY</h2>
          <div className="h-px bg-black w-32" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  hoveredId === image.id
                    ? "grayscale-0 scale-110"
                    : "grayscale hover:grayscale-0"
                }`}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/20 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
