import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax cho background và nội dung chữ
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const text = "DUCLUU.";

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative bg-black text-white overflow-hidden">
      {/* Background layer - Aurora / Glowing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-zinc-800/20 blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[30%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-zinc-900/40 blur-[100px] mix-blend-screen"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[40vw] rounded-full bg-green-900/10 blur-[120px] mix-blend-screen"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-0 pointer-events-none" />

      <motion.div 
        style={{ y: yBg, opacity }} 
        className="container mx-auto px-6 text-center relative z-10"
      >
        <h1 className="text-6xl md:text-8xl tracking-tight mb-6 flex justify-center overflow-hidden">
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0, rotateX: 90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1, 
                ease: [0.33, 1, 0.68, 1] 
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="h-px bg-white w-64 mx-auto mb-6 origin-center"
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-2xl tracking-widest text-gray-400"
        >
          MUSIC ARRANGER & GUITARIST
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => {
          // Scroll down to about section logic
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
