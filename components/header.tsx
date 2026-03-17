"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { Search, AlignJustify, ArrowRight } from "lucide-react"

// ── Typed easing ──────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

// ── Nav items ─────────────────────────────────────────────────────────
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Listing", href: "#listing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

// ── Panel variants ────────────────────────────────────────────────────
const panelVariants = {
  closed: { x: "100%", opacity: 0 },
  open: { x: "0%", opacity: 1, transition: { duration: 0.55, ease: EASE } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.45, ease: EASE } },
}

const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
}

const listVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
}

const itemVariants = {
  closed: { y: 24, opacity: 0 },
  open: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
  exit: { y: -12, opacity: 0, transition: { duration: 0.3, ease: EASE } },
}

// ── Animated icon button (animate-ui style — hover triggers motion) ───
function AnimIconBtn({
  children,
  onClick,
  label,
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  label: string
  className?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      aria-label={label}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors duration-200 hover:text-white ${className}`}
    >
      {/* Radial glow on hover */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
        }}
      />
      {children}
    </motion.button>
  )
}

// ── Animated hamburger ─────────────────────────────────────────────────
function Hamburger({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="group flex cursor-pointer items-center gap-3 text-text-primary"
      aria-label="Open navigation"
      whileTap={{ scale: 0.95 }}
    >
      {/* Three-line icon animates on hover */}
      <div className="flex w-5 flex-col gap-[5px]">
        <motion.span
          className="block h-px bg-current"
          animate={{ width: hov ? "100%" : "100%", opacity: hov ? 0.7 : 1 }}
        />
        <motion.span
          className="block h-px bg-current"
          animate={{ width: hov ? "60%" : "75%", opacity: hov ? 0.5 : 1 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="block h-px bg-current"
          animate={{ width: hov ? "100%" : "100%", opacity: hov ? 0.7 : 1 }}
        />
      </div>
      <motion.span
        className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase"
        animate={{ color: hov ? "white" : "var(--text-primary)" }}
        transition={{ duration: 0.2 }}
      >
        Menu
      </motion.span>
    </motion.button>
  )
}

// ── Magnetic nav item ──────────────────────────────────────────────────
function PanelNavItem({
  item,
  index,
  onClose,
}: {
  item: { label: string; href: string }
  index: number
  onClose: () => void
}) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 300, damping: 25 })
  const sy = useSpring(my, { stiffness: 300, damping: 25 })
  const [hov, setHov] = useState(false)

  return (
    <motion.li
      variants={itemVariants}
      className="overflow-hidden"
      style={{ borderBottom: "1px solid rgba(240,234,217,0.05)" }}
    >
      <motion.a
        href={item.href}
        onClick={onClose}
        style={{ x: sx, y: sy }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          mx.set((e.clientX - (r.left + r.width / 2)) * 0.12)
          my.set((e.clientY - (r.top + r.height / 2)) * 0.12)
        }}
        onMouseLeave={() => {
          mx.set(0)
          my.set(0)
          setHov(false)
        }}
        onMouseEnter={() => setHov(true)}
        className="group flex items-center justify-between py-[18px] font-serif text-[1.65rem] leading-none font-light tracking-tight text-text-primary/50 transition-colors duration-300 hover:text-text-primary"
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          className="text-white"
        >
          <ArrowRight size={16} strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </motion.li>
  )
}

// ── Main Header ────────────────────────────────────────────────────────
export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          STATE 1 — Full nav bar (unscrolled)
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!scrolled && !isOpen && (
          <motion.header
            key="full-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            className="fixed inset-x-0 top-0 z-50"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,9,7,0.52) 0%, transparent 100%)",
            }}
          >
            <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-8">
              <Link
                href="/"
                className="font-serif text-[22px] tracking-[0.25em] text-white uppercase italic"
              >
                IGNITE
              </Link>

              <nav className="hidden items-center gap-9 md:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-sans text-[10px] font-semibold tracking-[0.14em] text-text-secondary uppercase transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <AnimIconBtn label="Search">
                  <Search size={16} strokeWidth={1.5} />
                </AnimIconBtn>
                <a
                  href="#contact"
                  className="ml-2 hidden border-[0.5px] border-white/20 px-6 py-[8px] font-sans text-[10px] font-bold tracking-[0.2em] text-white bg-transparent backdrop-blur-sm uppercase transition-all duration-300 hover:bg-white hover:text-black sm:block rounded-full"
                >
                  Contact
                </a>
                <div className="ml-1 md:hidden">
                  <Hamburger onClick={() => setIsOpen(true)} />
                </div>
              </div>
            </div>

            <div
              className="mx-8 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              }}
            />
          </motion.header>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          STATE 2 — Ultra-transparent glass bar (scrolled)
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(scrolled || isOpen) && (
          <motion.header
            key="glass-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            className="fixed inset-x-0 top-0 z-50"
            style={{
              backdropFilter: "blur(18px) saturate(1.5)",
              WebkitBackdropFilter: "blur(18px) saturate(1.5)",
              background: "rgba(10, 9, 7, 0.12)" /* barely there */,
              borderBottom: "1px solid rgba(240,234,217,0.055)",
            }}
          >
            <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-8">
              <Hamburger onClick={() => setIsOpen(true)} />

              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 font-serif text-[20px] tracking-[0.25em] text-white uppercase italic"
              >
                IGNITE
              </Link>

              <div className="flex items-center gap-2">
                <AnimIconBtn label="Search" className="hidden md:flex">
                  <Search size={16} strokeWidth={1.5} />
                </AnimIconBtn>
                <a
                  href="#contact"
                  className="ml-1 hidden border-[0.5px] border-white/20 px-5 py-[7px] font-sans text-[10px] font-bold tracking-[0.2em] text-white bg-transparent uppercase transition-all duration-300 hover:bg-white hover:text-black sm:block rounded-full"
                >
                  Contact
                </a>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          SIDE PANEL — Compact right drawer (~50vw)
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Very subtle backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="exit"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-60"
              style={{ background: "rgba(0,0,0,0.12)" }}
            />

            {/* Panel — ultra-transparent glass */}
            <motion.div
              key="panel"
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-70 flex w-[50vw] max-w-[600px] min-w-[300px] flex-col"
              style={{
                backdropFilter: "blur(40px) saturate(1.8) brightness(0.95)",
                WebkitBackdropFilter:
                  "blur(40px) saturate(1.8) brightness(0.95)",
                /* Very low opacity — content bleeds through */
                background: "rgba(10, 9, 7, 0.2)",
                /* Soft left-edge fade — no hard line */
                boxShadow: "-100px 0 140px rgba(10,9,7,0.35)",
              }}
            >
              {/* Panel top bar */}
              <div
                className="flex h-[64px] shrink-0 items-center justify-between px-8"
                style={{ borderBottom: "1px solid rgba(240,234,217,0.05)" }}
              >
                <span className="font-sans text-[9px] font-semibold tracking-[0.18em] text-text-muted/40 uppercase">
                  Explore
                </span>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                  className="flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span className="font-sans text-[9px] font-semibold tracking-[0.18em] uppercase opacity-40">
                    Exit
                  </span>
                  {/* Animated × */}
                  <div className="relative ml-1 h-[14px] w-[14px]">
                    <motion.span
                      className="absolute top-1/2 left-0 block h-px w-full bg-current"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 45 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                    <motion.span
                      className="absolute top-1/2 left-0 block h-px w-full bg-current"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: -45 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  </div>
                </motion.button>
              </div>

              {/* Nav list */}
              <motion.ul
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="flex-1 overflow-y-auto px-8 py-4"
              >
                  <div className="flex flex-col gap-10">
                    <ul className="flex flex-col gap-3">
                      {navItems.map((item) => (
                        <motion.li
                          key={item.label}
                          variants={itemVariants}
                          className="flex items-center group"
                        >
                          <Link
                            href={item.href}
                            className="font-serif text-[40px] md:text-[64px] text-text-primary/70 italic hover:text-text-primary transition-all duration-500 tracking-tighter hover:translate-x-4 inline-block"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
              </motion.ul>

              {/* Footer CTA */}
              <motion.div
                variants={itemVariants}
                className="shrink-0 px-8 pt-6 pb-10"
                style={{ borderTop: "1px solid rgba(240,234,217,0.05)" }}
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-3 border-[0.5px] border-white/20 bg-transparent text-white rounded-full py-4 font-sans text-[10px] font-bold tracking-[0.16em] uppercase transition-all duration-500 hover:bg-white hover:text-black"
                >
                  Contact
                  <ArrowRight size={14} strokeWidth={1.5} />
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
