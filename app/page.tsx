"use client";

import { useState } from "react";
import OpeningCard from "@/components/OpeningCard";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-red-950 via-rose-900 to-purple-950 overflow-hidden relative perspective-[1000px]">
      {/* Текстура фона */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

      {/* Романтические градиенты на фоне */}
      <div className="absolute inset-0 romantic-bg opacity-50"></div>

      {/* Floating Background Particles (Hearts) */}
      {/* УБРАНО: blur-md и изменение opacity при открытии */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-1000 ${isOpened ? 'opacity-30' : 'opacity-70'}`}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s infinite linear`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            <Heart
              className="fill-current drop-shadow-lg"
              style={{
                width: `${15 + Math.random() * 45}px`,
                height: `${15 + Math.random() * 45}px`,
                // УБРАНО: фильтр размытия для отдельных сердечек
                filter: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Мерцающие звезды/искры */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* УБРАНО: blur-sm в контейнере при isOpened */}
      <div className={`z-10 w-full max-w-4xl flex flex-col items-center gap-8 transition-all duration-1000 ${isOpened ? 'scale-75 translate-y-20' : ''}`}>

        <motion.h1
          className={`text-5xl md:text-7xl font-romantic text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-red-200 drop-shadow-2xl text-center mb-4 transition-all duration-1000 ${isOpened ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isOpened ? 0 : 1, y: isOpened ? -30 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-glow-romantic sparkles">Happy Valentine's Day</span>
        </motion.h1>

        <motion.div
          className={`flex items-center gap-3 transition-opacity duration-1000 ${isOpened ? 'opacity-0' : 'opacity-100'}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isOpened ? 0 : 1, scale: isOpened ? 0.8 : 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent rounded-full"></div>
          <Heart className="w-6 h-6 text-rose-300 fill-rose-300 animate-heartbeat" />
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent rounded-full"></div>
        </motion.div>

        <OpeningCard onOpen={() => setIsOpened(true)} />

        <motion.p
          className={`text-rose-200/80 font-handwritten italic text-xl mt-8 text-center max-w-md transition-all duration-1000 ${isOpened ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} text-glow-romantic`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isOpened ? 0 : 1, y: isOpened ? 20 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Пусть любовь согревает твоё сердце... 💕
        </motion.p>
      </div>

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
            className="absolute z-50 top-10 md:top-20 left-0 right-0 flex justify-center pointer-events-none"
          >
            <div className="text-center">
              <h1 className="text-6xl md:text-9xl font-romantic text-white drop-shadow-[0_0_30px_rgba(255,100,100,0.9)] text-glow-red tracking-wide mb-4 animate-float-gentle">
                14 февраля,
              </h1>
              <h2 className="text-4xl md:text-6xl font-romantic text-red-300 drop-shadow-[0_0_25px_rgba(255,150,150,0.8)] text-glow-romantic animate-float-gentle sparkles" style={{ animationDelay: '0.5s' }}>
                любимая! ❤️
              </h2>
              <div className="mt-6 flex justify-center gap-4">
                <Heart className="w-10 h-10 text-red-400 fill-red-400 animate-heartbeat glow-red" />
                <Heart className="w-12 h-12 text-red-300 fill-red-300 animate-heartbeat glow-pink" style={{ animationDelay: '0.2s' }} />
                <Heart className="w-10 h-10 text-red-400 fill-red-400 animate-heartbeat glow-red" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpened && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute"
                initial={{
                  x: `${50}%`,
                  y: `${30}%`,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100 + 100}%`,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
              >
                <Heart
                  className={`fill-current ${i % 3 === 0 ? 'text-red-400' :
                    i % 3 === 1 ? 'text-pink-400' :
                      'text-rose-400'
                    }`}
                  style={{
                    width: `${10 + Math.random() * 20}px`,
                    height: `${10 + Math.random() * 20}px`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}