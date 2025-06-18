import { Button } from "@/components/ui/button";
import { ChevronDown, Volume2, VolumeX, Crosshair, BarChart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Helper component for the animated title (No changes here)
const AnimatedTitle = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  const container = { 
    hidden: { opacity: 0 }, 
    visible: (i = 1) => ({ 
      opacity: 1, 
      transition: { staggerChildren: 0.04, delayChildren: i * 0.2 } 
    }) 
  } as const;
  
  const child = { 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, damping: 12, stiffness: 200 } 
    }, 
    hidden: { 
      opacity: 0, 
      y: 20, 
      transition: { type: "spring" as const, damping: 12, stiffness: 200 } 
    } 
  } as const;

  return (
    <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter" variants={container} initial="hidden" animate="visible" style={{ display: "flex", overflow: "hidden" }}>
      {letters.map((letter, index) => (<motion.span key={index} variants={child}>{letter === " " ? "\u00A0" : letter}</motion.span>))}
    </motion.h1>
  );
};

// Add this new component at the top of the file
const NavigationButtons = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <Button
        size="lg"
        onClick={() => scrollToSection('military')}
        className="group relative bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 text-lg flex items-center gap-2 hover:from-red-500 hover:to-orange-400 transition-all duration-300"
      >
        <BarChart className="transition-transform duration-300 group-hover:-translate-y-1"/>
        <span>Explore Data</span>
      </Button>
      
      <Button
        size="lg"
        variant="outline"
        onClick={() => scrollToSection('military')}
        className="group relative bg-black/40 backdrop-blur-sm border-white/50 text-white hover:bg-white hover:text-black px-8 py-4 text-lg flex items-center gap-2 transition-all duration-300"
      >
        <Crosshair className="transition-transform duration-300 group-hover:rotate-90"/>
        <span>Watch Operations</span>
      </Button>
    </div>
  );
};

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Remove 3D effect related code
  const videos = ["/vi.mp4", "/hypersonic.mp4", "/artilery.mp4"];

  useEffect(() => {
    const interval = setInterval(() => setCurrentVideo((prev) => (prev + 1) % videos.length), 8000);
    return () => clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentVideo === 2) {
      audio.currentTime = 0;
      audio.play().catch(e => console.warn("Audio autoplay requires user interaction.", e));
    } else {
      audio.pause();
    }
  }, [currentVideo]);

  useEffect(() => { if (audioRef.current) audioRef.current.muted = isMuted; }, [isMuted]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video background */}
      <div className="absolute inset-0">
        {videos.map((video, index) => (
          <video 
            key={video} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${currentVideo === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,black)] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      {/* Main content */}
      <div className="relative text-center max-w-6xl mx-auto px-4">
        <motion.div 
          key={currentVideo} 
          initial="hidden" 
          animate="visible" 
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }} 
          className="flex flex-col items-center space-y-8"
        >
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <div className="text-white"><AnimatedTitle text="THE" /></div>
            <div className="text-red-500"><AnimatedTitle text="ARMS RACE" /></div>
          </motion.div>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
            transition={{ duration: 0.8 }} 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Tracking military expansion, nuclear threats, and the path to global peace in an era of unprecedented warfare technology.
          </motion.p>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
            transition={{ duration: 0.8 }}
          >
            <NavigationButtons />
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
            transition={{ delay: 1.5, duration: 1 }} 
            className="pt-16"
          >
            <div className="flex flex-col items-center gap-1 animate-pulse">
              <ChevronDown className="h-6 w-6 text-red-400" />
              <ChevronDown className="h-6 w-6 text-red-400 -mt-4" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mute button */}
      <div className="absolute bottom-5 right-5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsMuted(!isMuted)} 
            className="bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-white/10 rounded-full h-12 w-12" 
            aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
        </motion.div>
      </div>

      <audio ref={audioRef} src="/gunsound.mp3" preload="auto" loop />
    </section>
  );
};

export default HeroSection;