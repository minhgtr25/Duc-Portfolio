import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

// Define inline SVGs for Spotify and Youtube
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.56.3z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const projects = [
  {
    id: 1,
    title: "Ôm Em Khóc Thật To",
    artist: "DAQUIN",
    category: "SINGLE",
    year: "2026",
    image: "/img/omem.jpg",
    audioSrc: "/audio/Ôm Em Khóc Thật To.mp3",
    spotifyUrl: "https://open.spotify.com/track/5fvT9fn2GGn9q5KAaFo6Rc",
    youtubeUrl:
      "https://www.youtube.com/watch?v=ctFQZ1FDgck&list=RDctFQZ1FDgck&start_radio=1&pp=ygUWw7RtIGVtIGtow7NjIHRo4bqtdCB0b6AHAQ%3D%3D",
  },
  {
    id: 2,
    title: "Vì Đồng Bào, Cùng Chung Tay",
    artist: "Shay N",
    category: "SINGLE",
    year: "2025",
    image: "/img/vidongbao.jpg",
    audioSrc: "/audio/Vì đồng bào, cùng chung tay.mp3",
    spotifyUrl: "https://open.spotify.com/track/6wlA6c1zEwRnE3ejjNTB8T",
    youtubeUrl:
      "https://www.youtube.com/watch?v=ioUTsS8mBl0&list=RDioUTsS8mBl0&start_radio=1&pp=ygUgdsOsIMSR4buTbmcgYsOgbyBjw7luZyBjaHVuZyB0YXmgBwE%3D",
  },
  {
    id: 3,
    title: "SÓI CA",
    artist: "Brawler, Curlz",
    category: "SINGLE",
    year: "2025",
    image: "/img/soica.jpg",
    audioSrc: "/audio/Sói ca.mp3",
    youtubeUrl:
      "https://www.youtube.com/watch?v=M_u27ppUKyM&list=RDM_u27ppUKyM&start_radio=1&pp=ygUPc8OzaSBjYSBicmF3bGVyoAcB",
  },
  {
    id: 4,
    title: "BLACK MIRROR",
    artist: "Cyris, Curlz, KT",
    category: "SINGLE",
    year: "2025",
    image: "/img/blackmirror.jpg",
    audioSrc: "/audio/Black Mirror.mp3",
    facebookUrl: "https://www.facebook.com/reel/1109246727256893",
    youtubeUrl: "",
  },
  {
    id: 5,
    title: "Lời Mật Ngọt (Version 2.0)",
    artist: "Châu Nhi (Janie)",
    category: 'EP "FALLING ANGEL"',
    year: "2024",
    image: "/img/loimatngot.jpg",
    audioSrc: "/audio/Lời Mật Ngọt.mp3",
    spotifyUrl:
      "https://open.spotify.com/track/4GrKze4WF3GkCpXzwQPlgt?si=58cf38044fca4cc9&nd=1&dlsi=cf4b572873aa44c2",
    youtubeUrl: "https://youtu.be/ShshtjcIv-o?si=RgmwLYQt8VkuzaCa",
  },
  {
    id: 6,
    title: "Tại Sao Như Này",
    artist: "YOONA KIM",
    category: 'EP "CẢM NHẬN"',
    year: "2025",
    image: "/img/taisaonhunay.jpg",
    audioSrc: "/audio/Tại Sao Như Này.mp3",
    spotifyUrl: "https://open.spotify.com/track/1FTusNRky7oO17Ca4Sv5Ez",
    youtubeUrl: "https://youtu.be/rErjIeXC27M?si=AgDAGeWcGwp20-3e",
  },
];

export function Projects() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();

  return (
    <section className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl tracking-tight mb-4 md:mb-6">
            HIGHLIGHTED WORKS
          </h2>
          <div className="h-px bg-white w-24 md:w-32" />
        </motion.div>

        {/* Cấu trúc Grid Desktop (3 card) và List Mobile (1 cột dạng hàng ngang) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-20px" }}
              className="group cursor-pointer flex flex-row md:flex-col items-center md:items-start bg-zinc-900/40 hover:bg-zinc-800/80 md:bg-transparent md:hover:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none transition-colors"
              onClick={() => {
                if (currentTrack?.id === project.id) {
                  togglePlay();
                } else {
                  playTrack(project, projects);
                }
              }}
            >
              {/* Image & Desktop Overlay */}
              <div className="relative w-16 h-16 md:w-full md:h-auto md:aspect-square md:mb-4 overflow-hidden rounded-md md:rounded-none bg-gray-900 shrink-0 shadow-lg md:shadow-none">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${currentTrack?.id === project.id ? "grayscale-0" : "grayscale md:group-hover:grayscale-0 md:group-hover:scale-105"}`}
                />

                {/* Play button overlay: Luôn hiện nếu đang play, trên mobile ẩn đi để list, desktop hiển thị to khi hover */}
                <div
                  className={`absolute inset-0 bg-black/60 items-center justify-center transition-opacity duration-300 ${currentTrack?.id === project.id ? "flex opacity-100" : "hidden md:flex opacity-0 group-hover:opacity-100"}`}
                >
                  <div className="w-8 h-8 md:w-16 md:h-16 rounded-full border border-white md:border-2 flex items-center justify-center hover:scale-110 transition-transform">
                    {currentTrack?.id === project.id && isPlaying ? (
                      <Pause className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 md:w-6 md:h-6 ml-1 fill-current" />
                    )}
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 px-4 md:px-0 flex flex-col justify-center w-full">
                <h3 className="text-sm sm:text-base md:text-xl tracking-tight mb-0.5 md:mb-1 flex items-center gap-2 w-full">
                  {currentTrack?.id === project.id && (
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                  )}
                  <span
                    className={`truncate ${currentTrack?.id === project.id ? "text-green-400" : "text-white group-hover:text-green-400 md:group-hover:text-white transition-colors"}`}
                  >
                    {project.title}
                  </span>
                </h3>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs md:text-sm text-gray-400 gap-1 md:gap-2 w-full mt-1">
                  <span className="hidden md:block tracking-wider shrink-0">
                    {project.category}
                  </span>
                  <span className="truncate md:text-right flex-1">
                    {project.artist}{" "}
                    <span className="hidden md:inline">• {project.year}</span>
                  </span>
                </div>
              </div>

              {/* External Links (Spotify, Youtube) */}
              <div className="flex items-center gap-2 md:gap-3 md:mt-4 md:w-full md:justify-start">
                {project.spotifyUrl && (
                  <a
                    href={project.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-[#1DB954] transition-colors p-2 md:p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SpotifyIcon className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                )}
                {project.youtubeUrl && (
                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-[#FF0000] transition-colors p-2 md:p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <YoutubeIcon className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                )}
                {(project as any).facebookUrl && (
                  <a
                    href={(project as any).facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-[#1877F2] transition-colors p-2 md:p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FacebookIcon className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
