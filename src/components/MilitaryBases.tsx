import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  MapPin, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'

const MilitaryBases = () => {
  const baseData = [
    { 
      country: "United States", 
      bases: 750, 
      countries: 80, 
      description: "Unparalleled global military presence",
      flag: "🇺🇸",
      theme: "from-blue-900/70 to-indigo-700/60",
      strategicFocus: "Global power projection"
    },
    { 
      country: "Russia", 
      bases: 21, 
      countries: 9, 
      description: "Strategic geopolitical outposts",
      flag: "🇷🇺",
      theme: "from-red-900/70 to-blue-700/60",
      strategicFocus: "Regional influence"
    },
    { 
      country: "France", 
      bases: 8, 
      countries: 5, 
      description: "Maintaining colonial region influence",
      flag: "🇫🇷",
      theme: "from-blue-800/70 to-white/60",
      strategicFocus: "Cultural and economic ties"
    },
    { 
      country: "United Kingdom", 
      bases: 7, 
      countries: 4, 
      description: "Commonwealth strategic positioning",
      flag: "🇬🇧",
      theme: "from-red-900/70 to-blue-700/60",
      strategicFocus: "Historical network"
    },
    { 
      country: "China", 
      bases: 5, 
      countries: 3, 
      description: "Expanding through Belt & Road Initiative",
      flag: "🇨🇳",
      theme: "from-red-900/70 to-yellow-600/60",
      strategicFocus: "Economic expansion"
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
      dragFree: true,
    },
    [Autoplay({ 
      delay: 4000, 
      stopOnInteraction: false,
      stopOnMouseEnter: true 
    })]
  )

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <section 
      className="py-24 bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/80 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/15 via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-[0.03]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight uppercase">
            Global Military <span className="text-red-500">Bases</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Exploring the strategic global footprint of military installations
          </p>
        </motion.div>

        <div className="relative group">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {baseData.map((data, index) => (
                <div 
                  key={data.country} 
                  className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1, 
                      ease: "easeOut" 
                    }}
                    viewport={{ once: true }}
                  >
                    <Card 
                      className="
                        bg-zinc-900/50 backdrop-blur-2xl 
                        border border-white/10 shadow-2xl rounded-2xl
                        hover:border-white/20 hover:scale-[1.02]
                        transition-all duration-300 h-full
                        relative overflow-hidden flex flex-col
                      "
                    >
                      {/* Dynamic Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${data.theme} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      <div className="relative z-10 p-6 flex flex-col flex-grow">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="text-4xl">{data.flag}</span>
                            {data.country}
                          </CardTitle>
                          <p className="text-white/70 text-sm mt-2 italic">{data.description}</p>
                        </CardHeader>
                        
                        <CardContent className="p-0 mt-auto space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all">
                              <div className="flex items-center justify-center mb-2">
                                <MapPin className="w-6 h-6 text-red-400 mr-2" />
                                <p className="text-4xl font-bold text-red-500">{data.bases}</p>
                              </div>
                              <p className="text-white/80 text-sm">Military Bases</p>
                            </div>
                            <div className="text-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all">
                              <div className="flex items-center justify-center mb-2">
                                <Globe className="w-6 h-6 text-blue-400 mr-2" />
                                <p className="text-4xl font-bold text-blue-400">{data.countries}</p>
                              </div>
                              <p className="text-white/80 text-sm">Countries</p>
                            </div>
                          </div>
                          
                          {/* Strategic Focus */}
                          <div className="mt-4 text-center">
                            <p className="text-sm text-white/70 italic">
                              Strategic Focus: {data.strategicFocus}
                            </p>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {[
            { Icon: ChevronLeft, action: scrollPrev, position: 'left-[-12px]' },
            { Icon: ChevronRight, action: scrollNext, position: 'right-[-12px]' }
          ].map(({ Icon, action, position }) => (
            <motion.button 
              key={position}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(39, 39, 42, 0.8)' }}
              whileTap={{ scale: 0.9 }}
              onClick={action}
              className={`
                absolute top-1/2 -translate-y-1/2 ${position}
                bg-zinc-900/60 hover:bg-zinc-800/80 text-white 
                w-12 h-12 rounded-full z-20 transition-all 
                backdrop-blur-sm border border-white/10 shadow-lg
                flex items-center justify-center
                opacity-0 group-hover:opacity-100
                md:opacity-100
              `}
            >
              <Icon className="w-6 h-6" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilitaryBases;