"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const ValentineCard = () => {
    const [stage, setStage] = useState("idle");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 15,
                y: (e.clientY / window.innerHeight - 0.5) * 15
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const openCard = async () => {
        if (stage !== "idle") return;
        setStage("breaking");
        setTimeout(() => setStage("revealing"), 600);
        setTimeout(() => setStage("blooming"), 1400);
        setTimeout(() => setStage("opened"), 2800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1a0505] via-[#2d0a0a] to-[#0a0202]">

            {/* Параллакс свечение */}
            <motion.div
                animate={{ x: mousePos.x, y: mousePos.y }}
                className="absolute w-[120vw] h-[120vh] opacity-20 pointer-events-none blur-3xl"
                style={{
                    background: "radial-gradient(circle at 50% 50%, #ff1744 0%, #d81b60 30%, transparent 70%)",
                }}
            />

            {/* Плавающие сердечки */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${100 + Math.random() * 20}%`,
                        }}
                        animate={{
                            y: [0, -window.innerHeight - 200],
                            x: [0, (Math.random() - 0.5) * 100],
                            rotate: [0, 360],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: Math.random() * 8 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut",
                        }}
                    >
                        <Heart
                            size={Math.random() * 12 + 8}
                            className="text-pink-300 fill-pink-300/40"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Магические частицы */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * -80 - 20, 0],
                            x: [0, Math.random() * 60 - 30, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 6 + 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Заголовок */}
            <AnimatePresence>
                {stage === "idle" && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        transition={{ duration: 1.2 }}
                        className="absolute top-16 md:top-24 z-10 text-center"
                    >
                        <motion.h2
                            className="text-2xl md:text-4xl font-['Great_Vibes'] text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                            style={{ backgroundSize: "200% 200%" }}
                        >
                            С Днём Святого Валентина
                        </motion.h2>
                        <motion.div
                            className="h-px w-48 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent mx-auto mt-4"
                            animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Основная карточка */}
            <div className="relative w-full max-w-6xl px-4 perspective-[2000px]">
                <motion.div
                    className="relative w-full aspect-[4/3] md:aspect-[16/10] max-h-[85vh]"
                    style={{ transformStyle: "preserve-3d" }}
                >

                    {/* Внешний конверт - фон */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl overflow-hidden"
                        animate={
                            stage === "revealing" || stage === "blooming" || stage === "opened"
                                ? { scale: 1.05, opacity: 0, rotateX: 15 }
                                : { scale: 1, opacity: 1 }
                        }
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-red-800 to-rose-950 shadow-2xl" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

                        {/* Декоративная рамка на конверте */}
                        <div className="absolute inset-4 border-2 border-pink-200/20 rounded-xl" />
                    </motion.div>

                    {/* Крышка конверта */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1/2 origin-top z-30 rounded-t-2xl overflow-hidden"
                        animate={{
                            rotateX: stage !== "idle" ? -170 : 0,
                        }}
                        transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1] }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-b from-rose-800 via-red-900 to-rose-900 shadow-2xl"
                            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                        >
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    </motion.div>

                    {/* Сургучная печать */}
                    <AnimatePresence>
                        {stage === "idle" && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                whileHover={{ scale: 1.08, rotate: 5 }}
                                whileTap={{ scale: 0.92 }}
                                onClick={openCard}
                                exit={{
                                    scale: 0,
                                    rotate: 180,
                                    opacity: 0,
                                    transition: { duration: 0.6 }
                                }}
                            >
                                <motion.div
                                    className="relative"
                                    animate={{
                                        rotate: [0, 3, -3, 0],
                                        scale: [1, 1.02, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-red-600 via-rose-700 to-red-900 rounded-full shadow-[0_10px_40px_rgba(220,38,38,0.6),inset_-3px_-3px_15px_rgba(0,0,0,0.5)] flex items-center justify-center border-[6px] border-red-800/80">
                                        <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-100 fill-pink-100" />
                                    </div>

                                    {/* Блик на печати */}
                                    <motion.div
                                        animate={{
                                            left: ['-100%', '200%'],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute top-0 w-1/3 h-full bg-white/30 blur-xl skew-x-12"
                                    />

                                    {/* Искры вокруг печати */}
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute top-1/2 left-1/2"
                                            style={{
                                                rotate: `${i * 45}deg`,
                                            }}
                                            animate={{
                                                scale: [0, 1, 0],
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        >
                                            <Sparkles className="text-pink-300 w-4 h-4 -translate-x-2 -translate-y-20" />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.p
                                    animate={{
                                        y: [0, 8, 0],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                    className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-pink-200/80 tracking-[0.3em] text-xs md:text-sm uppercase font-light whitespace-nowrap"
                                >
                                    Нажмите, чтобы открыть
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Внутренняя карточка с фото */}
                    <motion.div
                        className="absolute inset-0 z-20"
                        initial={{ scale: 0.85, y: 20, z: -200, opacity: 0 }}
                        animate={
                            stage === "revealing"
                                ? { scale: 0.92, y: -20, z: 100, opacity: 1 }
                                : stage === "blooming"
                                    ? { scale: 0.98, y: -40, z: 300, opacity: 1 }
                                    : stage === "opened"
                                        ? { scale: 1, y: -50, z: 400, opacity: 1 }
                                        : { scale: 0.85, y: 20, z: -200, opacity: 0 }
                        }
                        transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>

                            {/* Центральная панель с фото */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-[#fffef9] to-[#faf8f0] rounded-2xl shadow-2xl overflow-hidden"
                                animate={stage === "opened" ? {
                                    boxShadow: "0 30px 90px rgba(0,0,0,0.4), 0 0 80px rgba(255,192,203,0.3)"
                                } : {}}
                            >
                                {/* Рамка вокруг фото */}
                                <div className="absolute inset-0 p-6 md:p-10 flex flex-col">

                                    {/* Декоративная рамка */}
                                    <div className="absolute inset-6 md:inset-10 border-[3px] border-rose-200/40 rounded-xl pointer-events-none" />
                                    <div className="absolute inset-8 md:inset-12 border border-rose-300/30 rounded-lg pointer-events-none" />

                                    {/* Фото */}
                                    <motion.div
                                        className="relative flex-1 rounded-xl overflow-hidden"
                                        initial={{ filter: "grayscale(60%) sepia(20%)" }}
                                        animate={
                                            stage === "opened"
                                                ? { filter: "grayscale(0%) sepia(0%)" }
                                                : { filter: "grayscale(60%) sepia(20%)" }
                                        }
                                        transition={{ duration: 2.5, delay: 0.5 }}
                                    >
                                        {/* ЗАМЕНИТЕ /api/placeholder/1200/800 на путь к вашему фото */}
                                        {/* Например: /couple-photo.jpg */}
                                        <img
                                            src="/api/placeholder/1200/800"
                                            alt="Love"
                                            className="w-full h-full object-cover object-center"
                                        // Для вашего конкретного фото используйте:
                                        // className="w-full h-full object-cover object-[60%_35%]"
                                        // Это сместит фокус вправо, где находятся лица
                                        />

                                        {/* Виньетка вокруг фото */}
                                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.15)] pointer-events-none" />

                                        {/* Розовое свечение вокруг лиц */}
                                        {/* Настроено для фото где лица справа */}
                                        <motion.div
                                            className="absolute top-[25%] left-[60%] -translate-x-1/2 w-[50%] h-[45%]"
                                            initial={{ opacity: 0 }}
                                            animate={stage === "opened" ? { opacity: 0.18 } : { opacity: 0 }}
                                            transition={{ duration: 2, delay: 1 }}
                                        >
                                            <div className="w-full h-full bg-gradient-radial from-pink-300 via-rose-200 to-transparent blur-3xl" />
                                        </motion.div>
                                    </motion.div>

                                    {/* Подпись под фото */}
                                    <motion.div
                                        className="h-16 md:h-20 flex flex-col items-center justify-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={
                                            stage === "opened"
                                                ? { opacity: 1, y: 0 }
                                                : { opacity: 0, y: 20 }
                                        }
                                        transition={{ duration: 1.5, delay: 1.5 }}
                                    >
                                        <p className="font-['Playfair_Display'] italic text-sm md:text-base text-rose-800/70 tracking-[0.2em]">
                                            Навсегда вместе
                                        </p>
                                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent mt-2" />
                                    </motion.div>
                                </div>

                                {/* Текстура бумаги */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30 pointer-events-none mix-blend-multiply" />
                            </motion.div>

                            {/* Левая створка */}
                            <motion.div
                                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-br from-[#fffef9] to-[#faf8f0] rounded-l-2xl overflow-hidden"
                                initial={{ rotateY: 0 }}
                                animate={
                                    stage === "opened"
                                        ? { rotateY: -125 }
                                        : { rotateY: 0 }
                                }
                                transition={{ duration: 2.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30" />

                                <motion.div
                                    className="h-full flex flex-col justify-center items-center p-6 md:p-12"
                                    initial={{ opacity: 0 }}
                                    animate={stage === "opened" ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 1, delay: 2 }}
                                >
                                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-rose-400 to-transparent mb-8" />

                                    <h3 className="font-['Great_Vibes'] text-4xl md:text-6xl text-rose-700 mb-8">
                                        Моя любовь,
                                    </h3>

                                    <p className="font-['Playfair_Display'] text-gray-600 text-base md:text-lg leading-relaxed italic text-center max-w-xs">
                                        Каждый момент с тобой — это драгоценный дар, который я берегу в своём сердце
                                    </p>

                                    <Heart className="text-rose-400 fill-rose-200 mt-8" size={32} />
                                </motion.div>

                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-rose-200/40 to-transparent" />
                            </motion.div>

                            {/* Правая створка */}
                            <motion.div
                                className="absolute inset-y-0 right-0 w-full origin-right bg-gradient-to-br from-[#faf8f0] to-[#fffef9] rounded-r-2xl overflow-hidden"
                                initial={{ rotateY: 0 }}
                                animate={
                                    stage === "opened"
                                        ? { rotateY: 125 }
                                        : { rotateY: 0 }
                                }
                                transition={{ duration: 2.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30" />

                                <motion.div
                                    className="h-full flex flex-col justify-center items-center p-6 md:p-12"
                                    initial={{ opacity: 0 }}
                                    animate={stage === "opened" ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 1, delay: 2 }}
                                >
                                    <Sparkles className="text-rose-400 mb-8" size={36} />

                                    <p className="font-['Playfair_Display'] text-gray-600 text-base md:text-lg leading-relaxed italic text-center max-w-xs mb-8">
                                        Лювби, понимания и счастливых моментов
                                    </p>

                                    <div className="text-center">
                                        <p className="font-['Great_Vibes'] text-3xl md:text-5xl text-rose-600">
                                            Люблю тебя
                                        </p>
                                        <p className="font-['Playfair_Display'] text-sm text-gray-400 tracking-[0.3em] mt-4">
                                            FOREVER
                                        </p>
                                    </div>

                                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-rose-400 to-transparent mt-8" />
                                </motion.div>

                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-rose-200/40 to-transparent" />
                            </motion.div>

                        </div>
                    </motion.div>

                </motion.div>
            </div>

            {/* Финальное сообщение */}
            <AnimatePresence>
                {stage === "opened" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed bottom-8 md:bottom-16 left-0 right-0 z-50 pointer-events-none px-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 3, duration: 2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center max-w-2xl mx-auto"
                        >
                            <motion.h1
                                className="font-['Great_Vibes'] text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200 drop-shadow-[0_0_40px_rgba(255,182,193,0.5)]"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 8, repeat: Infinity }}
                                style={{ backgroundSize: "200% 200%" }}
                            >
                                Ты — моё всё ❤️
                            </motion.h1>

                            <motion.p
                                className="mt-6 md:mt-10 text-pink-300/60 font-light tracking-[0.6em] uppercase text-xs"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 4.5, duration: 2 }}
                            >
                                С Днём Святого Валентина 2026
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Виньетка */}
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)] z-[100]" />

        </div>
    );
};

export default ValentineCard;