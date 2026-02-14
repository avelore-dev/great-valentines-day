"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Lock, Unlock, Download, RefreshCcw } from "lucide-react";

interface OpeningCardProps {
    onOpen?: () => void;
}

const OpeningCard: React.FC<OpeningCardProps> = ({ onOpen }) => {
    const [lockLeft, setLockLeft] = useState(false);
    const [lockRight, setLockRight] = useState(false);
    const [opened, setOpened] = useState(false);
    const [extracted, setExtracted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    // 1. Добавляем состояние для позиции мыши
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const IMAGE_SRC = "/capture.png";

    // 2. Исправляем ошибку TypeScript (добавляем тип MouseEvent)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 15,
                y: (e.clientY / window.innerHeight - 0.5) * 15
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        if (lockLeft && lockRight) {
            setTimeout(() => {
                setOpened(true);
                if (onOpen) onOpen();
                setTimeout(() => setExtracted(true), 1000);
            }, 400);
        }
    }, [lockLeft, lockRight, onOpen]);

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement("a");
        link.href = IMAGE_SRC;
        link.download = "valentine_card.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center" style={{ isolation: 'isolate' }}>
            {/* 3. Применяем mousePos для легкого 3D наклона всего конверта */}
            <motion.div 
                className="relative w-[320px] h-[220px] md:w-[500px] md:h-[350px] preserve-3d"
                animate={{
                    rotateX: mousePos.y,
                    rotateY: mousePos.x
                }}
                transition={{ type: "spring", stiffness: 75, damping: 15 }}
            >

                {/* === 1. ЗАДНЯЯ СТЕНКА === */}
                <motion.div
                    className="absolute inset-0 bg-[#3d080c] rounded-lg shadow-2xl"
                    style={{ transform: "translateZ(-5px)" }}
                    animate={extracted ? { opacity: 0, transitionEnd: { display: "none" } } : { opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* === 2. КАРТОЧКА (ФОТО + ТЕКСТ) === */}
                <motion.div
                    className="absolute left-4 right-4 bottom-4 h-[90%] origin-bottom"
                    style={{ zIndex: extracted ? 100 : 5 }}
                    animate={
                        extracted
                            ? {
                                y: [0, -280, 0],
                                z: [0, 30, 100],
                                rotateZ: [0, -2, 0],
                                scale: [1, 1.05, 1.15]
                            }
                            : { y: 0, z: 0, rotateZ: 0, scale: 1 }
                    }
                    transition={{ duration: 1.4, times: [0, 0.5, 1], ease: "easeInOut" }}
                >
                    <motion.div
                        className="w-full h-full relative preserve-3d cursor-pointer shadow-2xl rounded-sm"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        onClick={() => extracted && setIsFlipped(!isFlipped)}
                    >
                        {/* ЛИЦЕВАЯ СТОРОНА */}
                        <div className="absolute inset-0 backface-hidden bg-white p-3 pb-12 flex flex-col border border-gray-200">
                            <div className="w-full h-full relative group overflow-hidden border border-gray-100">
                                <img src={IMAGE_SRC} alt="Valentine" className="w-full h-full object-cover" />
                                {extracted && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                                        <button
                                            onClick={handleDownload}
                                            className="bg-white text-red-600 px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-110 transition-transform shadow-lg"
                                        >
                                            <Download size={20} /> Скачать
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-2 text-gray-400 text-sm">
                                <RefreshCcw size={14} /> Нажми, чтобы прочитать
                            </div>
                        </div>

                        {/* ОБРАТНАЯ СТОРОНА С СЕРДЕЧКАМИ */}
                        <div
                            className="absolute inset-0 backface-hidden bg-[#fffdf8] p-6 border border-gray-200 flex flex-col items-center justify-center text-center overflow-hidden"
                            style={{ transform: "rotateY(180deg)" }}
                        >
                            <div className="absolute top-4 left-4 -rotate-12 opacity-40 scale-75"><Heart /></div>
                            <div className="absolute top-12 right-10 rotate-45 opacity-60 scale-90"><Heart /></div>
                            <div className="absolute bottom-12 left-10 rotate-12 opacity-50 scale-110"><Heart /></div>
                            <div className="absolute bottom-6 right-6 -rotate-45 opacity-40"><Heart /></div>
                            <div className="absolute top-1/2 left-2 -translate-y-1/2 rotate-90 opacity-20 scale-50"><Heart /></div>
                            <div className="absolute top-1/3 right-4 rotate-12 opacity-30 scale-75"><Heart /></div>

                            <h2 className="relative z-10 text-2xl md:text-3xl text-red-800 font-bold leading-relaxed flex flex-col items-center gap-4">
                                <span>Любви, понимания и счастливых моментов</span>
                                {/* Используем size вместо scale для корректного отображения */}
                                <Heart size={64} className="text-red-600 fill-red-600 shadow-sm" />
                            </h2>
                        </div>
                    </motion.div>
                </motion.div>

                {/* === 3. ПЕРЕДНИЙ КАРМАН === */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ transform: "translateZ(10px)" }}
                    animate={extracted ? { opacity: 0, transitionEnd: { display: "none" } } : { opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-[#7c1016]" style={{ clipPath: "polygon(0 0, 0% 100%, 50% 50%)" }} />
                    <div className="absolute inset-0 bg-[#7c1016]" style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }} />
                    <div className="absolute inset-0 bg-[#610a0f] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)" }} />
                </motion.div>

                {/* === 4. КРЫШКА КОНВЕРТА === */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-1/2 origin-top preserve-3d"
                    style={{
                        zIndex: opened ? 10 : 40,
                        transform: "translateZ(11px)"
                    }}
                    animate={{
                        rotateX: opened ? 280 : 0,
                        opacity: extracted ? 0 : 1,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 bg-[#8b0f17] backface-hidden flex items-end justify-center pb-6" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}>
                        {!opened && (
                            <div className="flex gap-8 mb-4 pointer-events-auto">
                                <HeartBtn locked={lockLeft} onClick={() => setLockLeft(true)} />
                                <HeartBtn locked={lockRight} onClick={() => setLockRight(true)} />
                            </div>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-[#5a0a0e] backface-hidden" style={{ transform: "rotateX(180deg)", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
                </motion.div>
            </motion.div>
        </div>
    );
};

interface HeartBtnProps {
    locked: boolean;
    onClick: () => void;
}

const HeartBtn: React.FC<HeartBtnProps> = ({ locked, onClick }) => (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClick} className="relative z-50">
        <Heart className={`w-14 h-14 transition-all duration-500 ${locked ? 'fill-red-400 text-red-400' : 'fill-black/30 text-black/10'}`} />
        <div className="absolute inset-0 flex items-center justify-center text-white/80">
            {locked ? <Unlock size={20} /> : <Lock size={20} />}
        </div>
    </motion.button>
);

export default OpeningCard;
