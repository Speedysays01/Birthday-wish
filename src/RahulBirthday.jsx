import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Gift, Sparkles, Zap, PartyPopper, Music } from 'lucide-react';
import bday from './assets/bday.mp3'
const RahulBirthday = () => {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    setIsOpened(true);
    // Attempt to play audio on interaction
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <div className="w-full h-100vh bg-black overflow-hidden font-sans select-none">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        loop 
        src={bday}
        // Note: Using a generic test MP3. Replace with your specific birthday instrumental URL.
      />

      {!isOpened ? (
        <IntroScreen onOpen={handleOpen} />
      ) : (
        <ChaosParty />
      )}
    </div>
  );
};

const IntroScreen = ({ onOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black relative">
      <div className="animate-bounce cursor-pointer group" onClick={onOpen}>
        <Gift size={120} className="text-red-500 group-hover:text-red-400 transition-colors drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
        <p className="text-white mt-8 text-2xl font-bold animate-pulse text-center font-mono">
          OPEN THE GIFT <br/> (CLICK ME)
        </p>
      </div>
      
      {/* Subtle hint of chaos to come */}
      <div className="absolute top-10 left-10 animate-spin text-yellow-600 opacity-20">
        <Sparkles size={40} />
      </div>
    </div>
  );
};

const ChaosParty = () => {
  // --- ADD YOUR 10 IMAGES HERE ---
  const rahulImages = useMemo(() => [
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290587/154_ymhqnn.png", // Paste Image URL 1 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290587/150_bdnuzh.png", // Paste Image URL 2 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290587/154_ymhqnn.png", // Paste Image URL 3 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290591/Submerged_Calm_xjjbo7.png", // Paste Image URL 4 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290588/Sunset_Rider_utg5rm.png", // Paste Image URL 5 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290587/Snorlax_Bond_sdcgyk.png", // Paste Image URL 6 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290586/Urban_Solitude_uik79d.png", // Paste Image URL 7 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290587/154_ymhqnn.png", // Paste Image URL 8 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1767290587/150_bdnuzh.png", // Paste Image URL 9 here
    "https://res.cloudinary.com/docyzmmbl/image/upload/v1763553165/170_misql0.png" // Paste Image URL 10 here
  ], []);

  // Generate random positions for chaos elements
  // We use useMemo so they don't jump around on every re-render, only on mount
  const chaosElements = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // %
      top: Math.random() * 100, // %
      size: 50 + Math.random() * 150, // px
      rotation: Math.random() * 360,
      animDuration: 2 + Math.random() * 8, // seconds
      animDelay: Math.random() * 2,
      direction: Math.random() > 0.5 ? 'reverse' : 'normal',
      imgIndex: Math.floor(Math.random() * 10) // Pick one of the 10 images randomly
    }));
  }, []);

  const firecrackers = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90,
      top: Math.random() * 90,
      scale: 0.5 + Math.random(),
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      
      {/* 1. CHAOTIC BACKGROUND ELEMENTS (Floating Heads) */}
      {chaosElements.map((el) => (
        <div
          key={el.id}
          className="absolute border-4 border-dashed border-pink-500 rounded-full overflow-hidden z-0"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            transform: `rotate(${el.rotation}deg)`,
            animation: `spin-slow ${el.animDuration}s linear infinite ${el.direction}`,
            borderColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random()*5)]
          }}
        >
          {/* Mapped to the specific random image index */}
          <img 
            src={rahulImages[el.imgIndex]} 
            alt="random rahul" 
            className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
          />
        </div>
      ))}

      {/* 2. FIRECRACKERS (Simulated with icons/gifs) */}
      {firecrackers.map((fc) => (
        <div 
          key={fc.id}
          className="absolute z-10 animate-ping"
          style={{
            left: `${fc.left}%`,
            top: `${fc.top}%`,
            animationDuration: '0.8s',
            animationDelay: `${fc.delay}s`,
            transform: `scale(${fc.scale})`
          }}
        >
          {/* Using text emoji for firecracker vibe + Lucide icon */}
          <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(255,255,0,1)]">💥</span>
        </div>
      ))}

      {/* 3. CENTERPIECE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        
        {/* The Text */}
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-pulse text-center leading-tight drop-shadow-[5px_5px_0px_rgba(255,255,255,0.5)] transform -rotate-6 font-serif">
          HAPPY <br/> BIRTHDAY <br/> RAHUL BHAI
        </h1>

        {/* The Main Man - Fixed Image */}
        <div className="mt-8 relative animate-bounce-slow">
           <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-75 animate-pulse"></div>
           <img 
             src="https://res.cloudinary.com/docyzmmbl/image/upload/v1763843122/_Neo_Seraph___n7jhpo.png" 
             alt="Rahul Main" 
             className="w-64 h-64 md:w-96 md:h-96 rounded-full border-[10px] border-double border-yellow-400 object-cover relative z-10 shadow-[0_0_50px_10px_rgba(255,0,255,0.8)]"
             style={{
               animation: 'wobble 3s infinite ease-in-out'
             }}
           />
           <div className="absolute -bottom-10 right-0 text-white text-4xl animate-bounce font-bold bg-red-600 p-2 transform rotate-12">
             PARTY HARD!!!
           </div>
        </div>

      </div>

      {/* 4. EXTRA NOISE / GIFS */}
      <div className="absolute top-10 right-10 z-30 animate-spin-slow">
        <Zap size={80} className="text-yellow-400 fill-current" />
      </div>
      <div className="absolute bottom-20 left-10 z-30 animate-bounce">
        <PartyPopper size={80} className="text-green-400" />
      </div>
       <div className="absolute top-1/2 right-10 z-30 animate-pulse">
        <Music size={60} className="text-purple-400" />
      </div>
<p className='text-white self-center text-xl
'>Best wishes from Surabhi!</p>
      
      {/* Marquee Text at bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-yellow-300 text-black font-bold text-2xl overflow-hidden whitespace-nowrap py-2 z-40 border-t-4 border-red-600">
        <div className="animate-marquee inline-block">
          RAHUL BHAI KA BIRTHDAY HAI!!! 🎂🎂🎂 NACHO SARE!!! 💃💃💃 CAKE KATEGA SABME BATEGA!!! 🎉🎉🎉ZEBVO.AI ZINDABAAD!!! 🎉🎉🎉 
          RAHUL BHAI KA BIRTHDAY HAI!!! 🎂🎂🎂 NACHO SARE!!! 💃💃💃 CAKE KATEGA SABME BATEGA!!! 🎉🎉🎉ZEBVO.AI ZINDABAAD!!! 🎉🎉🎉 
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(-3deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.1); }
        }
        @keyframes animate-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-marquee {
          animation: animate-marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RahulBirthday;