"use client"

import { useRef, useState } from "react"
import { motion, HTMLMotionProps } from "framer-motion"

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({
  children,
  className = "",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    // Get mouse position relative to the button center
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)

    // Damping factor - how much it pulls towards the mouse
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`interactive group relative inline-flex items-center justify-center overflow-hidden ${className}`}
      {...props}
    >
      {/* Background fill reveal on hover */}
      <div className="absolute inset-0 z-0 translate-y-full rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0" />

      {/* Magnetic Text Content */}
      <motion.span
        animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-black"
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
