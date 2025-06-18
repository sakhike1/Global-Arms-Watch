import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Globe,
  Users,
  Shield,
  Home,
  School,
  Hospital,
  Droplet,
} from "lucide-react";

const warMessages = [
  "Every day, families are torn apart by conflict.",
  "Children lose their homes, their schools, their future.",
  "Access to clean water becomes a daily struggle.",
  "Medical supplies run dangerously low.",
  "Communities are forced to flee their homes.",
  "Education becomes a distant dream.",
  "Basic necessities become luxuries.",
  "The trauma of war affects generations.",
  "Humanitarian aid is desperately needed.",
  "Your voice can make a difference.",
];

const causes = [
  {
    id: "ukraine",
    name: "Ukraine Crisis Relief",
    description: "Support families facing displacement and conflict.",
    emotionalText: "Families torn apart, children's lives on hold. Your help can bring hope.",
    icon: Home,
  },
  {
    id: "gaza",
    name: "Gaza Humanitarian Aid",
    description: "Deliver critical supplies to those in urgent need.",
    emotionalText: "Urgent needs for water, food, and medicine. Every drop, every bite counts.",
    icon: Droplet,
  },
  {
    id: "congo",
    name: "Congo Conflict Support",
    description: "Protect vulnerable communities affected by violence.",
    emotionalText: "Millions displaced, struggling for safety. Be a beacon of peace.",
    icon: Shield,
  },
  {
    id: "general",
    name: "Global War Relief",
    description: "Respond wherever conflict creates dire humanitarian needs.",
    emotionalText: "Across the globe, unseen crises unfold. Your flexible support makes a difference everywhere.",
    icon: Globe,
  },
];

const statCards = [
  {
    icon: Users,
    value: "100M+",
    label: "People displaced by conflict worldwide",
    gradient: "from-pink-500 to-red-400",
  },
  {
    icon: School,
    value: "27M",
    label: "Children out of school due to war",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Hospital,
    value: "50%",
    label: "Of healthcare facilities destroyed in conflict zones",
    gradient: "from-blue-400 to-cyan-400",
  },
];

const Donate = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % warMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-red-950/30 to-slate-900 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/building.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-red-950/50 to-slate-900/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent animate-pulse"></div>
      </div>

      {/* Moving Message Overlay */}
      <div className="absolute top-20 left-0 right-0 flex justify-center z-20 h-24 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="backdrop-blur-md bg-black/40 rounded-xl px-8 py-4 shadow-lg border border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg tracking-wide">
                {warMessages[currentMessageIndex]}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 mt-40"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 text-transparent bg-clip-text drop-shadow-2xl tracking-tight">
            The Human Cost of War
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md font-light tracking-wide">
            Behind every statistic is a human story. Behind every conflict is a community in need.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-2xl border border-white/20 shadow-2xl ring-1 ring-white/10"
        >
          <div className="space-y-12">
            {/* Crisis Areas */}
            <div className="space-y-4">
              <Label className="text-xl text-white font-semibold flex items-center gap-2">
                <Globe className="h-6 w-6 text-gradient bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text" /> Global Crisis Areas
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {causes.map((cause) => (
                  <motion.div
                    key={cause.id}
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-white/10 border border-white/10 hover:bg-white/20 hover:border-red-500/50 shadow-lg group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
                    <div className="p-6 relative z-20 flex flex-col items-center">
                      <cause.icon className="h-10 w-10 mb-3 text-gradient bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text" />
                      <h3 className="text-lg font-bold text-white mb-1 tracking-wide group-hover:underline">{cause.name}</h3>
                      <p className="text-sm text-gray-200 mb-2 font-light text-center">{cause.description}</p>
                      <p className="text-xs text-orange-200 italic text-center">{cause.emotionalText}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Impact Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {statCards.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.06 }}
                  className={`rounded-2xl p-8 border border-white/10 bg-white/10 shadow-xl flex flex-col items-center transition-all duration-300`}
                >
                  <stat.icon className={`h-10 w-10 mb-4 text-gradient bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text`} />
                  <h3 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight">{stat.value}</h3>
                  <p className="text-gray-200 text-center font-light tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-14">
              <Button
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg text-lg transition-all duration-300"
                onClick={() => {
                  toast({
                    title: "Thank You for Your Interest",
                    description: "Your compassion can make a difference in someone's life.",
                    duration: 5000,
                  });
                }}
              >
                Learn More About How You Can Help
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Donate;