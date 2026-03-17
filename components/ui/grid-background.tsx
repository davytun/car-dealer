import React from "react";

interface GridBackgroundProps {
  className?: string;
  gridColor?: string;
  dotColor?: string;
  maskSize?: string;
  type?: "grid" | "dot";
}

export function GridBackground({
  className = "",
  gridColor = "rgba(255, 255, 255, 0.03)",
  dotColor = "rgba(255, 255, 255, 0.1)",
  maskSize = "ellipse 80% 50% at 50% 0%",
  type = "grid",
}: GridBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage:
          type === "grid"
            ? `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`
            : `radial-gradient(${dotColor} 1px, transparent 1px)`,
        backgroundSize: type === "grid" ? "40px 40px" : "24px 24px",
        maskImage: `radial-gradient(${maskSize}, black, transparent)`,
        WebkitMaskImage: `radial-gradient(${maskSize}, black, transparent)`,
      }}
    />
  );
}

export default GridBackground;
