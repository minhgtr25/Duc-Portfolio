import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

const projects = [
  {
    id: 1,
    title: "Ôm Em Khóc Thật To",
    artist: "DAQUIN",
    category: "SINGLE",
    year: "2026",
    image: "/img/omem.jpg",
    audioSrc: "/audio/Ôm Em Khóc Thật To.mp3",
  },
  {
    id: 2,
    title: "Vì Đồng Bào, Cùng Chung Tay",
    artist: "Shay N",
    category: "SINGLE",
    year: "2025",
    image: "/img/vidongbao.jpg",
    audioSrc: "/audio/Vì đồng bào, cùng chung tay.mp3",
  },
  {
    id: 3,
    title: "SÓI CA",
    artist: "Brawler, Curlz",
    category: "SINGLE",
    year: "2025",
    image: "/img/soica.jpg",
    audioSrc: "/audio/Sói ca.mp3",
  },
];

export function Projects() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();

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
            HIGHLIGHTED WORKS
          </h2>
          <div className="h-px bg-white w-32" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => {
                if (currentTrack?.id === project.id) {
                  togglePlay();
                } else {
                  playTrack(project, projects);
                }
              }}
            >
              <div className="relative aspect-square mb-4 overflow-hidden bg-gray-900">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${currentTrack?.id === project.id ? "grayscale-0" : "grayscale group-hover:grayscale-0 group-hover:scale-105"}`}
                />
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${currentTrack?.id === project.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                >
                  <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center hover:scale-110 transition-transform">
                    {currentTrack?.id === project.id && isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-xl tracking-tight mb-1 flex items-center gap-2">
                {currentTrack?.id === project.id && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
                {project.title}
              </h3>
              <div className="flex justify-between text-sm text-gray-400">
                <span className="tracking-wider">{project.category}</span>
                <span>
                  {project.artist} • {project.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
