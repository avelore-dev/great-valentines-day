"use client";

import { useState } from "react";
import OpeningCard from "@/components/OpeningCard";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-red-950 via-rose-900 to-purple-950 overflow-hidden relative perspective-[1000px]">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

      {/* Floating Background Particles (Hearts) */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-1000 ${isOpened ? 'blur-md opacity-50' : ''}`}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s infinite linear`,
            }}
          >
            <Heart
              className="fill-current"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`
              }}
            />
          </div>
        ))}
      </div>

      <div className={`z-10 w-full max-w-4xl flex flex-col items-center gap-8 transition-all duration-1000 ${isOpened ? 'scale-75 translate-y-20' : ''}`}>
        {/* Title fades out when opened to focus on card/message */}
        <h1 className={`text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-pink-200 to-rose-200 drop-shadow-lg text-center mb-4 transition-opacity duration-1000 ${isOpened ? 'opacity-0' : 'opacity-100'}`}>
          Happy Valentine's Day
        </h1>

        <OpeningCard onOpen={() => setIsOpened(true)} />

        <p className={`text-rose-200/60 font-serif italic text-lg mt-8 text-center max-w-md transition-opacity duration-1000 ${isOpened ? 'opacity-0' : 'opacity-100'}`}>
          Пусть любовь согревает твоё сердце...
        </p>
      </div>

      {/* Final Message Overlay */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
            className="absolute z-50 top-10 md:top-20 left-0 right-0 flex justify-center pointer-events-none"
          >
            <h1 className="text-5xl md:text-8xl font-serif text-white drop-shadow-[0_0_25px_rgba(255,100,100,0.8)] text-center tracking-wide">
              14 февраля,<br />
              <span className="text-red-400 font-bold">любимая!</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
