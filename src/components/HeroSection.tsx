import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videos = [
    "/vi.mp4",
    "/hypersonic.mp4",
    "/artilery.mp4"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Videos */}
      <div className="absolute inset-0 z-0">
        {videos.map((video, index) => (
          <video
            key={video}
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
              currentVideo === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={video} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-red-950"></div>
          </video>
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Additional red tint overlay for military theme */}
        <div className="absolute inset-0 bg-red-900/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="text-white">THE</span>
            <br />
            <span className="text-red-500">ARMS RACE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tracking military expansion, nuclear threats, and the path to global peace in an era of unprecedented warfare technology
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#military">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                Explore Military Data
              </Button>
            </a>
            <a href="#military">
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-black px-8 py-4 text-lg">
                Watch Operations
              </Button>
            </a>
          </div>

          <div className="mt-16">
            <ArrowDown className="mx-auto h-8 w-8 text-red-400 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
    </section>
  );
};

export default HeroSection;
