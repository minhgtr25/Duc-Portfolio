import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPortable, setIsPortable] = useState(false);

  useEffect(() => {
    // Tối ưu cho mobile: Nếu thiết bị dùng cảm ứng thì tắt con trỏ chuột custom
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsPortable(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Trỏ chuột sẽ to lên khi di chuột qua thẻ a, button hoặc div có class cursor-pointer
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".group") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isPortable) return null; // Không render trên thiết bị cảm ứng

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none mix-blend-difference z-[9999] flex items-center justify-center border border-white"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    />
  );
}
