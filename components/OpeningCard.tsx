"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Unlock, Download, RefreshCcw, X } from "lucide-react";

interface OpeningCardProps {
    onOpen?: () => void;
}

const OpeningCard: React.FC<OpeningCardProps> = ({ onOpen }) => {
    const [lockLeft, setLockLeft] = useState(false);
    const [lockRight, setLockRight] = useState(false);
    const [opened, setOpened] = useState(false);
    const [extracted, setExtracted] = useState(false);

    // Состояние для переворота карточки
    const [isFlipped, setIsFlipped] = useState(false);
    const [showTextAnimation, setShowTextAnimation] = useState(false);

    const IMAGE_SRC = "/capture.jpg";

    useEffect(() => {
        if (lockLeft && lockRight) {
            setTimeout(() => {
                setOpened(true);
                if (onOpen) onOpen();
                // Через секунду после открытия крышки карточка вылетает, а конверт начинает исчезать
                setTimeout(() => setExtracted(true), 1000);
            }, 400);
        }
    }, [lockLeft, lockRight, onOpen]);

    useEffect(() => {
        if (isFlipped) {
            setTimeout(() => setShowTextAnimation(true), 300);
        } else {
            setShowTextAnimation(false);
        }
    }, [isFlipped]);

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement("a");
        link.href = IMAGE_SRC;
        link.download = "valentine_card.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFlip = () => {
        if (extracted) {
            setIsFlipped(!isFlipped);
        }
    };

    return (
        <>
            <div className="relative w-full h-[600px] flex items-center justify-center" style={{ isolation: 'isolate' }}>
                <div className="relative w-[320px] h-[220px] md:w-[500px] md:h-[350px] preserve-3d">

                    {/* === 1. ЗАДНЯЯ СТЕНКА (РАСТВОРЯЕТСЯ) === */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#5a0a0e] via-[#3d080c] to-[#2a0608] rounded-lg shadow-2xl glow-red"
                        style={{ transform: "translateZ(-5px)" }}
                        animate={extracted ? { opacity: 0, transitionEnd: { display: "none" } } : { opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />

                    {/* === 2. КАРТОЧКА (ФОТО + ТЕКСТ НА ОБОРОТЕ) === */}
                    <motion.div
                        className="absolute left-4 right-4 bottom-4 h-[90%] origin-bottom"
                        style={{
                            zIndex: extracted ? 100 : 5,
                        }}
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
                            onClick={handleFlip}
                        >
                            {/* --- ЛИЦЕВАЯ СТОРОНА (ФОТОГРАФИЯ) --- */}
                            <div className="absolute inset-0 backface-hidden bg-white p-3 pb-12 flex flex-col border-2 border-red-100 shadow-inner">
                                <div className="w-full h-full relative group overflow-hidden border-2 border-red-200/50 bg-gradient-to-br from-gray-50 to-white shadow-md rounded-sm">
                                    <img src={IMAGE_SRC} alt="Valentine" className="w-full h-full object-contain" />

                                    {extracted && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/50 via-black/30 to-transparent backdrop-blur-[2px]">
                                            <button
                                                onClick={handleDownload}
                                                className="bg-white text-red-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-110 transition-all shadow-2xl hover-lift glow-pink"
                                            >
                                                <Download size={20} /> Скачать
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-2 text-gray-400 text-sm font-handwritten">
                                    <RefreshCcw size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
                                    <span className="sparkles">Нажми, чтобы прочитать</span>
                                </div>
                            </div>

                            {/* --- ОБРАТНАЯ СТОРОНА (ПРЕВЬЮ) --- */}
                            <div
                                className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#fffef9] via-[#fff8f0] to-[#ffede5] p-6 border border-red-200/30 flex items-center justify-center paper-texture shadow-inner"
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                <div className="text-center relative">
                                    {/* Пульсирующий фоновый круг */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                        <div className="w-32 h-32 bg-red-300 rounded-full blur-2xl animate-pulse"></div>
                                    </div>
                                    {/* Сердечко */}
                                    <Heart className="w-20 h-20 mx-auto text-red-500 fill-red-500 mb-4 animate-heartbeat glow-red drop-shadow-2xl relative z-10" />
                                    {/* Текст */}
                                    <p className="text-red-800 font-bold text-lg relative z-10 font-romantic">
                                        Нажми, чтобы прочитать письмо
                                    </p>
                                    {/* Декоративная линия */}
                                    <div className="mt-3 flex justify-center gap-2">
                                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* === 3. ПЕРЕДНИЙ КАРМАН (РАСТВОРЯЕТСЯ) === */}
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{ transform: "translateZ(10px)" }}
                        animate={extracted ? { opacity: 0, transitionEnd: { display: "none" } } : { opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8b0f17] to-[#7c1016]" style={{ clipPath: "polygon(0 0, 0% 100%, 50% 50%)" }} />
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#8b0f17] to-[#7c1016]" style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#610a0f] to-[#7c1016] shadow-[0_-10px_30px_rgba(139,15,23,0.6)]" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)" }} />
                    </motion.div>

                    {/* === 4. КРЫШКА КОНВЕРТА (РАСТВОРЯЕТСЯ) === */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1/2 origin-top preserve-3d"
                        style={{
                            zIndex: opened ? 10 : 40,
                            transform: "translateZ(11px)"
                        }}
                        animate={{
                            rotateX: opened ? 280 : 0,
                            opacity: extracted ? 0 : 1,
                            transitionEnd: extracted ? { display: "none" } : {}
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#a31621] via-[#8b0f17] to-[#7c1016] backface-hidden flex items-end justify-center pb-6 shadow-lg" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}>
                            {!opened && (
                                <div className="flex gap-8 mb-4 pointer-events-auto">
                                    <HeartBtn locked={lockLeft} onClick={() => setLockLeft(true)} />
                                    <HeartBtn locked={lockRight} onClick={() => setLockRight(true)} />
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5a0a0e] to-[#4a0a0c] backface-hidden shadow-inner" style={{ transform: "rotateX(180deg)", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
                    </motion.div>
                </div>
            </div>

            {/* === ПОЛНОЭКРАННОЕ ПИСЬМО === */}
            <AnimatePresence>
                {isFlipped && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                        onClick={handleFlip}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, y: 50, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-3xl max-h-[90vh] bg-gradient-to-br from-[#fffef9] via-[#fff8f0] to-[#fff0e8] rounded-3xl shadow-2xl overflow-hidden border-4 border-red-900/10 card-shadow-romantic paper-texture"
                        >
                            {/* Декоративные градиенты по краям */}
                            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-rose-100/30 via-pink-50/20 to-transparent pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-100/30 via-pink-50/20 to-transparent pointer-events-none" />

                            {/* Декоративные сердечки по углам */}
                            <div className="absolute top-6 left-6 text-rose-300/40 twinkle">
                                <Heart className="w-8 h-8 fill-current" />
                            </div>
                            <div className="absolute top-6 right-6 text-pink-300/40 twinkle twinkle-delay-1">
                                <Heart className="w-8 h-8 fill-current" />
                            </div>
                            <div className="absolute bottom-6 left-6 text-red-300/40 twinkle twinkle-delay-2">
                                <Heart className="w-6 h-6 fill-current" />
                            </div>
                            <div className="absolute bottom-6 right-6 text-rose-300/40 twinkle twinkle-delay-3">
                                <Heart className="w-6 h-6 fill-current" />
                            </div>

                            {/* Кнопка закрытия */}
                            <button
                                onClick={handleFlip}
                                className="absolute top-5 right-5 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110 hover-lift glow-pink"
                            >
                                <X size={24} className="text-red-800" />
                            </button>

                            {/* Контейнер с прокруткой */}
                            <div className="overflow-y-auto max-h-[90vh] p-8 md:p-14 custom-scrollbar">
                                <div className="space-y-8">
                                    {/* Заголовок */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={showTextAnimation ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.1, duration: 0.6 }}
                                        className="text-center pb-8 relative"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                            <Heart className="w-32 h-32 text-red-500 fill-red-500" />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl text-red-800 font-bold leading-relaxed relative z-10 font-romantic sparkles">
                                            Любимая, радость моя, пандочка 🐼❤️
                                        </h2>
                                        <div className="mt-4 flex justify-center gap-2">
                                            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-300 to-transparent rounded-full"></div>
                                            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                                            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-300 to-transparent rounded-full"></div>
                                        </div>
                                    </motion.div>

                                    {/* Параграфы с анимацией */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={showTextAnimation ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-base md:text-lg text-gray-800 leading-relaxed font-handwritten"
                                    >
                                        <p className="mb-6 bg-gradient-to-r from-rose-50/50 to-pink-50/50 p-5 rounded-2xl border-l-4 border-red-300 shadow-sm">
                                            Я благодарен Боженьке, что он подарил мне тебя, что мы встретились и слились в единое🤗🙏
                                            Каждый день, каждая минута, секунда, проводимые с тобой, делает меня лучше, наша любовь крепнет,
                                            и мы сливаемся в единое😍
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={showTextAnimation ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="text-base md:text-lg text-gray-800 leading-relaxed font-handwritten"
                                    >
                                        <p className="mb-6 bg-gradient-to-r from-pink-50/50 to-rose-50/50 p-5 rounded-2xl border-l-4 border-pink-300 shadow-sm">
                                            Я всегда буду благодарен тебе, что ты у меня есть, за твою заботу, за любовь, которую даришь мне 🙏
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={showTextAnimation ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                        className="text-base md:text-lg text-gray-800 leading-relaxed font-handwritten"
                                    >
                                        <p className="mb-8 bg-gradient-to-r from-rose-50/50 to-red-50/50 p-5 rounded-2xl border-l-4 border-rose-300 shadow-sm">
                                            Мы с тобой преодолим все преграды и трудности, будем примером нашим детям и гордостью наших родителей 😌
                                        </p>
                                    </motion.div>

                                    {/* Заключение */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={showTextAnimation ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.9, duration: 0.6 }}
                                        className="text-center pt-8 space-y-4 relative"
                                    >
                                        <div className="bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 p-8 rounded-3xl border-2 border-red-200/50 shadow-lg">
                                            <p className="text-2xl md:text-3xl text-red-700 font-bold font-romantic text-glow-red mb-4">
                                                Люблю тебя очень сильно ❤️❤️❤️
                                            </p>
                                            <div className="flex justify-center gap-2 mb-4">
                                                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent rounded-full"></div>
                                            </div>
                                            <p className="text-xl md:text-2xl text-gray-700 italic font-elegant">
                                                Твой юристик, Виталий😘❤️🫡
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Декоративные сердечки */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={showTextAnimation ? { opacity: 1 } : {}}
                                        transition={{ delay: 1.1, duration: 0.6 }}
                                        className="flex justify-center gap-6 pt-6"
                                    >
                                        <Heart className="w-10 h-10 text-red-300 fill-red-300 animate-heartbeat" />
                                        <Heart className="w-12 h-12 text-red-400 fill-red-400 animate-heartbeat glow-pink" style={{ animationDelay: '0.2s' }} />
                                        <Heart className="w-14 h-14 text-red-500 fill-red-500 animate-heartbeat glow-red" style={{ animationDelay: '0.4s' }} />
                                        <Heart className="w-12 h-12 text-red-400 fill-red-400 animate-heartbeat glow-pink" style={{ animationDelay: '0.6s' }} />
                                        <Heart className="w-10 h-10 text-red-300 fill-red-300 animate-heartbeat" style={{ animationDelay: '0.8s' }} />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

interface HeartBtnProps {
    locked: boolean;
    onClick: () => void;
}

const HeartBtn: React.FC<HeartBtnProps> = ({ locked, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.85 }}
        onClick={onClick}
        className="relative z-50 transition-all duration-300"
    >
        <Heart className={`w-14 h-14 transition-all duration-500 ${locked
                ? 'fill-red-400 text-red-400 animate-heartbeat glow-red drop-shadow-[0_0_15px_rgba(248,113,113,0.8)]'
                : 'fill-black/30 text-black/10 hover:fill-white/20 hover:text-white/20'
            }`} />
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${locked ? 'text-white drop-shadow-lg' : 'text-white/80'
            }`}>
            {locked ? <Unlock size={22} className="animate-pulse" /> : <Lock size={22} />}
        </div>
        {locked && (
            <div className="absolute inset-0 animate-ping">
                <Heart className="w-14 h-14 fill-red-400 text-red-400 opacity-50" />
            </div>
        )}
    </motion.button>
);

export default OpeningCard;