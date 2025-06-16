import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const PeaceSection = () => {
  const peaceInitiatives = [
    {
      title: "Nuclear Disarmament",
      description: "Reducing global nuclear arsenals through international treaties",
      progress: 35,
      status: "In Progress"
    },
    {
      title: "Diplomatic Dialogue",
      description: "Establishing communication channels between conflicting nations",
      progress: 60,
      status: "Active"
    },
    {
      title: "Economic Cooperation",
      description: "Creating mutual economic dependencies to reduce conflict incentives",
      progress: 45,
      status: "Developing"
    },
    {
      title: "International Law",
      description: "Strengthening global institutions and conflict resolution mechanisms",
      progress: 55,
      status: "Ongoing"
    }
  ];

  const scrollToDonate = () => {
    const donateSection = document.getElementById('donate');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="peace" className="py-20 bg-gradient-to-b from-red-950/60 via-red-950/20 to-black relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            PATH TO <span className="text-green-400">PEACE</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            How global cooperation and diplomacy can overcome the arms race
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {peaceInitiatives.map((initiative, index) => (
            <Card 
              key={initiative.title} 
              className="bg-white/5 backdrop-blur-lg border-green-900/20 hover:border-green-600/40 transition-all hover:scale-105 group"
            >
              <CardHeader>
                <CardTitle className="text-white flex justify-between items-center">
                  {initiative.title}
                  <span className="text-xs bg-green-600/80 text-white px-2 py-1 rounded-full group-hover:bg-green-500 transition-colors">
                    {initiative.status}
                  </span>
                </CardTitle>
                <p className="text-white/80">{initiative.description}</p>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
                <p className="text-green-400 text-sm mt-2 group-hover:text-green-300 transition-colors">
                  {initiative.progress}% Progress
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-green-900/20 rounded-lg p-8 text-center relative overflow-hidden">
          {/* Enhanced decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-red-500/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent"></div>
          
          <div className="relative">
            <h3 className="text-3xl font-bold text-white mb-4">Peace is Possible</h3>
            <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
              Through international cooperation, diplomatic engagement, and shared commitment to human security, 
              we can build a world free from the threat of nuclear annihilation and endless military competition.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToDonate}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
            >
              Support Peace Initiatives
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeaceSection;
