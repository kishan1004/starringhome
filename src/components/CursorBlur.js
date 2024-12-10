import React, { useEffect, useState } from "react";

const CursorBlur = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrame;

    const handleMouseMove = (event) => {
      // Use `requestAnimationFrame` for smoother updates
      animationFrame = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* The orange blur circle that follows the cursor */}
      <div
        className="fixed w-20 h-20 bg-orange-500 opacity-80 rounded-full blur-[50px] pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          position: "fixed", // Ensures it's positioned relative to the viewport
        }}
      />
    </>
  );
};

export default CursorBlur;
