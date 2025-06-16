import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MilitaryExpansion from "@/components/MilitaryExpansion";
import MilitaryBases from "@/components/MilitaryBases";
import NuclearDanger from "@/components/NuclearDanger";
import PeaceSection from "@/components/PeaceSection";
import WarAnalysis from "@/components/WarAnalysis";
import Donate from "@/components/Donate";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <HeroSection />
      <MilitaryExpansion />
      <MilitaryBases />
      <NuclearDanger />
      <PeaceSection />
      <WarAnalysis />
      <Donate />
      <Footer />
    </div>
  );
};

export default Index;
