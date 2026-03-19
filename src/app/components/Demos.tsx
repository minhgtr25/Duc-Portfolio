import { motion } from "motion/react";
import { Play, Pause, ExternalLink } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

type DemoInfo = {
  label: string;
  value: string;
};

type DemoProject = {
  id: number;
  title: string;
  info: DemoInfo[];
  linkDemo: string;
  audioSrc: string;
};

const demos: DemoProject[] = [
  {
    id: 101,
    title: 'OST "Dream From My Father ft. Đinh Viết Tường"',
    linkDemo:
      "https://drive.google.com/file/d/1NzszOEUFKVSYopq4TdXX5E4lch3lbvA6/view", // Thêm link video/demo thật vào đây
    audioSrc: "/audio/ballad 1 demo.mp3", // Link audio nháp
    info: [
      { label: "Dự kiến", value: "2026" },
      { label: "Vai trò", value: "Music Arranger, Beat Maker" },
      { label: "Thể loại", value: "K-Ballad" },
      {
        label: "Phong cách",
        value: "Tối giản, âm thanh mộc, cổ điển (piano, string, guitar)",
      },
    ],
  },
  {
    id: 102,
    title: 'OST "Kỳ nghỉ của bố"',
    linkDemo:
      "https://drive.google.com/drive/folders/1EXtTBmMYKHjKic3pmno06Q1zcl9My0n5",
    audioSrc: "/audio/Demo bài 1.mp3",
    info: [
      { label: "Dự kiến", value: "2026" },
      { label: "Vai trò", value: "Music Arranger, Beat Maker" },
      { label: "Thể loại", value: "Pop Ballad, Pop" },
      {
        label: "Nội dung",
        value: "Hai màu sắc đối lập: mộc mạc cổ điển và vui tươi trẻ trung.",
      },
    ],
  },
];

export function Demos() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();

  return (
    <section className="bg-black text-white pb-20 md:pb-32">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4 text-zinc-100">
            UNRELEASED TRACKS
          </h2>
          <div className="h-px bg-zinc-800 w-full mb-8" />
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-6">
          {demos.map((demo, index) => {
            const isActive = currentTrack?.id === demo.id;

            return (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${isActive ? "bg-zinc-900/80 border-green-500/50" : "bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700"}`}
              >
                {/* Visual Accent */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-500 ${isActive ? "bg-green-500" : "bg-transparent group-hover:bg-zinc-700"}`}
                />

                <div className="flex flex-col md:flex-row p-5 md:p-6 lg:p-8 gap-6 md:gap-10">
                  {/* Left Side: Title & Action */}
                  <div className="md:w-1/3 flex flex-col justify-between shrink-0">
                    <div>
                      <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-4 flex items-center gap-3">
                        <span
                          className={isActive ? "text-green-400" : "text-white"}
                        >
                          {demo.title}
                        </span>
                      </h3>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) {
                          togglePlay();
                        } else {
                          // Dùng ảnh about.jpg làm cover mặc định cho Demos trên Sidebar Player
                          playTrack(
                            {
                              id: demo.id,
                              title: demo.title,
                              artist: "DUCLUU",
                              image: "/img/about.jpg",
                              audioSrc: demo.audioSrc,
                              category: "DEMO",
                              year: "2025",
                            },
                            [],
                          );
                        }
                      }}
                      className={`inline-flex items-center mt-4 md:mt-8 gap-3 w-fit px-5 py-2.5 rounded-full transition-all duration-300 ${isActive && isPlaying ? "bg-green-500 text-black hover:bg-green-400" : "bg-white text-black hover:bg-zinc-200"}`}
                    >
                      {isActive && isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                          <span className="font-semibold tracking-wide text-xs md:text-sm">
                            PAUSE
                          </span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 md:w-5 md:h-5 ml-1 fill-current" />
                          <span className="font-semibold tracking-wide text-xs md:text-sm">
                            {isActive ? "RESUME DEMO" : "PLAY DEMO"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right Side: Detailed Info */}
                  <div className="md:w-2/3 flex flex-col justify-center border-t md:border-t-0 md:border-l border-zinc-800/50 pt-5 md:pt-0 md:pl-8">
                    <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-zinc-400">
                      {demo.info.map((item, i) => (
                        <li key={i} className="flex flex-col gap-0.5">
                          <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                            {item.label}
                          </span>
                          <span className="text-zinc-300 leading-snug">
                            {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {demo.linkDemo && (
                      <div className="mt-5 pt-5 border-t border-zinc-800/50">
                        <a
                          href={demo.linkDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500 hover:text-white transition-colors group/link w-fit"
                        >
                          <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          <span>Link Demo Mở Rộng</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
