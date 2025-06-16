import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";

const NuclearDanger = () => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  const fullText = "⚠️ Global nuclear weapons count: 12,574 warheads - enough to destroy civilization multiple times";
  
  useEffect(() => {
    let currentIndex = 0;
    let timeout: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(typeText, 50); // Adjust speed here
      } else {
        setIsTyping(false);
      }
    };

    typeText();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const nuclearData = [
    { country: "Russia", warheads: 6375, status: "Active Expansion" },
    { country: "United States", warheads: 5800, status: "Modernization" },
    { country: "China", warheads: 410, status: "Rapid Growth" },
    { country: "France", warheads: 290, status: "Stable" },
    { country: "United Kingdom", warheads: 225, status: "Reducing" },
    { country: "Pakistan", warheads: 170, status: "Expanding" },
    { country: "India", warheads: 164, status: "Growing" },
    { country: "Israel", warheads: 90, status: "Undeclared" },
    { country: "North Korea", warheads: 50, status: "Testing" }
  ];

  return (
    <section id="nuclear" className="py-20 bg-gradient-to-b from-red-950/40 via-black to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            NUCLEAR <span className="text-red-500">THREAT</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            The world's nuclear arsenals pose unprecedented risks to humanity
          </p>
          
          <Alert className="max-w-4xl mx-auto border-red-600/50 bg-white/5 backdrop-blur-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
            <AlertDescription className="text-red-300 text-lg relative">
              <span className={`inline-block ${isTyping ? 'after:content-["|"] after:animate-blink' : ''}`}>
                {displayText}
              </span>
              <span className="inline-block ml-1 text-red-500 animate-pulse">⚠️</span>
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nuclearData.map((data, index) => (
            <Card 
              key={data.country} 
              className="bg-white/5 backdrop-blur-lg border-red-900/20 hover:border-red-600/40 transition-all hover:scale-105 group"
            >
              <CardHeader>
                <CardTitle className="text-white flex justify-between items-center">
                  {data.country}
                  <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
                    data.status.includes('Expansion') || data.status.includes('Growth') || data.status.includes('Growing') || data.status.includes('Expanding')
                      ? 'bg-red-600/80 text-white group-hover:bg-red-500'
                      : data.status.includes('Testing')
                      ? 'bg-orange-600/80 text-white group-hover:bg-orange-500'
                      : 'bg-gray-600/80 text-white group-hover:bg-gray-500'
                  }`}>
                    {data.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-500 mb-2 group-hover:text-red-400 transition-colors">{data.warheads}</p>
                  <p className="text-white">Nuclear Warheads</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-lg border border-red-900/20 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-red-400 mb-6">The Nuclear Danger</h3>
          <div className="grid md:grid-cols-2 gap-8 text-white">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Immediate Risks</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Nuclear accidents and technical failures
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Escalation of regional conflicts
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Cyber attacks on nuclear facilities
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Nuclear terrorism threats
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Global Consequences</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Nuclear winter and climate catastrophe
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Radiation poisoning affecting millions
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Economic collapse and famine
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Civilization-ending scenarios
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NuclearDanger;

// Add these styles to your global CSS file or create a new style block
const styles = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
`;
