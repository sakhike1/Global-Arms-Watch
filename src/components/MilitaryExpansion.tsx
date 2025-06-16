import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  DollarSign, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'

const MilitaryExpansion = () => {
  // Enhanced countries data with additional context
  const countries = [
    { 
      name: "China", 
      expansion: 85, 
      budget: "293B", 
      growth: "+7.1%",
      flag: "🇨🇳",
      theme: "from-red-900/70 to-red-600/60",
      description: "Rapidly modernizing military with focus on technological advancement"
    },
    { 
      name: "Russia", 
      expansion: 78, 
      budget: "154B", 
      growth: "+4.5%",
      flag: "🇷🇺",
      theme: "from-blue-900/70 to-red-700/60",
      description: "Emphasizing strategic military capabilities and regional influence"
    },
    { 
      name: "United States", 
      expansion: 92, 
      budget: "816B", 
      growth: "+2.8%",
      flag: "🇺🇸",
      theme: "from-blue-900/70 to-indigo-700/60",
      description: "Maintaining global military superiority through advanced technologies"
    },
    { 
      name: "India", 
      expansion: 73, 
      budget: "81B", 
      growth: "+6.2%",
      flag: "🇮🇳",
      theme: "from-orange-900/70 to-green-700/60",
      description: "Increasing indigenous defense production and military modernization"
    },
    { 
      name: "North Korea", 
      expansion: 68, 
      budget: "Unknown", 
      growth: "+12%",
      flag: "🇰🇵",
      theme: "from-gray-900/70 to-red-900/60",
      description: "Continuing nuclear and missile technology development"
    }
  ];

  // Carousel configuration with enhanced options
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
      stopOnMouseEnter: true // Pause on hover
    })]
  )

  // Memoized navigation handlers
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <section 
      id="military" 
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
            Global Military <span className="text-red-500">Expansion</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Comprehensive analysis of nations advancing their military capabilities and defense strategies
          </p>
        </motion.div>

        <div className="relative group">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {countries.map((country, index) => (
                <div 
                  key={country.name} 
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
                      <div className={`absolute inset-0 bg-gradient-to-br ${country.theme} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      <div className="relative z-10 p-6 flex flex-col flex-grow">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="text-4xl">{country.flag}</span>
                            {country.name}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-0 mt-auto space-y-5">
                          <div>
                            <div className="flex justify-between text-sm mb-2 text-white/90">
                              <span className="flex items-center">
                                <Rocket className="w-4 h-4 mr-2 text-red-400" />
                                Military Expansion Index
                              </span>
                              <span className="font-semibold">{country.expansion}%</span>
                            </div>
                            <Progress 
                              value={country.expansion} 
                              className="h-2.5 bg-white/20 rounded-full" 
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 text-white/80">
                              <DollarSign className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <div>
                                <p>Defense Budget</p>
                                <p className="text-white font-semibold text-base">${country.budget}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                              <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <div>
                                <p>Annual Growth</p>
                                <p className="text-green-300 font-semibold text-base">{country.growth}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Added description for additional context */}
                          <div className="mt-4 text-white/70 text-sm italic">
                            "{country.description}"
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

export default MilitaryExpansion;