import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import {
  Heart,
  CreditCard,
  Banknote,
  Gift,
  HandHeart, // A more direct icon for giving
  ShieldCheck, // For trust
  MessageSquare, // For communication, if we add a message field
  DollarSign, // For amount
  Globe, // For general cause
  Users, // For impact
} from "lucide-react";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCause, setSelectedCause] = useState("ukraine");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [donorName, setDonorName] = useState(""); // New state for donor name
  const [donorEmail, setDonorEmail] = useState(""); // New state for donor email
  const [loading, setLoading] = useState(false); // For submit button loading state
  const { toast } = useToast();

  const predefinedAmounts = ["25", "50", "100", "250", "500", "1000"];

  const causes = [
    {
      id: "ukraine",
      name: "Ukraine Crisis Relief",
      description: "Support families facing displacement and conflict.",
      emotionalText: "Families torn apart, children's lives on hold. Your help can bring hope.",
      impact: "Provides emergency food and medical aid.",
    },
    {
      id: "gaza",
      name: "Gaza Humanitarian Aid",
      description: "Deliver critical supplies to those in urgent need.",
      emotionalText: "Urgent needs for water, food, and medicine. Every drop, every bite counts.",
      impact: "Ensures access to clean water and shelter.",
    },
    {
      id: "congo",
      name: "Congo Conflict Support",
      description: "Protect vulnerable communities affected by violence.",
      emotionalText: "Millions displaced, struggling for safety. Be a beacon of peace.",
      impact: "Supports protection and essential services.",
    },
    {
      id: "general",
      name: "Global War Relief",
      description: "Respond wherever conflict creates dire humanitarian needs.",
      emotionalText: "Across the globe, unseen crises unfold. Your flexible support makes a difference everywhere.",
      impact: "Allows rapid response to emerging crises.",
    },
  ];

  // Helper to get cause details
  const currentCauseDetails = causes.find(c => c.id === selectedCause);

  const getImpactMessage = (val) => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) return "Choose an amount to see its impact!";
    if (num < 50) return "Can provide emergency food for one person for a week.";
    if (num < 100) return "Can supply vital medical supplies for a small clinic.";
    if (num < 250) return "Can provide clean drinking water for 10 families for a month.";
    if (num < 500) return "Can offer temporary shelter and blankets for a displaced family.";
    if (num < 1000) return "Can support psychological first aid for traumatized children.";
    return "Can deliver critical aid and long-term support to multiple families.";
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    const donationAmount = customAmount || amount;
    
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // In a real application, you would integrate with a payment processor here
    // e.g., Stripe, PayPal, etc. This would involve sending donorName, donorEmail,
    // donationAmount, selectedCause, and paymentMethod to your backend.
    console.log({
      donorName,
      donorEmail,
      donationAmount,
      selectedCause,
      paymentMethod,
    });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Thank You, " + (donorName || "Hero") + "!",
      description: `Your generous donation of $${donationAmount} will make a direct difference in ${currentCauseDetails.name}.`,
      duration: 5000,
    });

    // Reset form fields after successful submission (optional)
    setAmount("");
    setCustomAmount("");
    setDonorName("");
    setDonorEmail("");
    setSelectedCause("ukraine"); // Or keep the last selected
    setPaymentMethod("card"); // Or keep the last selected
    
    setLoading(false); // End loading state
  };

  return (
    <section id="donate" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-red-950/30 to-slate-950 overflow-hidden">
      {/* Background Video with enhanced overlay */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-red-950/50 to-slate-950/90"></div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 text-transparent bg-clip-text drop-shadow-lg">
            Make a Difference Today
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
            Your contribution can bring hope and relief to those affected by conflict. Every donation counts.
          </p>
        </motion.div>

        {/* Main Donation Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          <form onSubmit={handleDonation} className="space-y-8">
            {/* Cause Selection */}
            <div className="space-y-4">
              <Label className="text-xl text-white font-semibold flex items-center gap-2">
                <Globe className="h-6 w-6 text-red-400" /> Select Your Cause
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {causes.map((cause) => (
                  <motion.div
                    key={cause.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedCause === cause.id 
                        ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20' 
                        : 'hover:shadow-lg hover:shadow-red-500/10'
                    }`}
                    onClick={() => setSelectedCause(cause.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
                    <div className="p-6 relative z-20">
                      <Heart className="h-8 w-8 text-red-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">{cause.name}</h3>
                      <p className="text-sm text-gray-300 mb-3">{cause.description}</p>
                      <p className="text-xs text-red-300 italic">{cause.emotionalText}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Amount Selection */}
            <div className="space-y-4">
              <Label className="text-xl text-white font-semibold flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-red-400" /> Choose Amount
              </Label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {predefinedAmounts.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={amount === value ? "default" : "outline"}
                    className={`w-full text-white font-semibold py-4 transition-all duration-300 ${
                      amount === value
                        ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-red-500/50"
                    }`}
                    onClick={() => {
                      setAmount(value);
                      setCustomAmount("");
                    }}
                  >
                    ${value}
                  </Button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mt-6">
                <Label htmlFor="customAmount" className="text-sm text-gray-300">
                  Or enter your preferred amount
                </Label>
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="Enter amount (e.g., 75)"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount("");
                  }}
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                />
              </div>

              {/* Impact Message */}
              {(amount || customAmount) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-900/20 rounded-lg border border-green-500/30 text-center"
                >
                  <p className="text-green-300 font-medium">
                    Your contribution of ${amount || customAmount} <span className="font-bold">{getImpactMessage(amount || customAmount)}</span>
                  </p>
                </motion.div>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <Label className="text-xl text-white font-semibold flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-red-400" /> Payment Method
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'card', icon: CreditCard, label: 'Credit/Debit Card' },
                  { id: 'bank', icon: Banknote, label: 'Bank Transfer' },
                  { id: 'crypto', icon: Gift, label: 'Cryptocurrency' }
                ].map(({ id, icon: Icon, label }) => (
                  <motion.div
                    key={id}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      paymentMethod === id
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 shadow-lg'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/50'
                    }`}
                    onClick={() => setPaymentMethod(id)}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Icon className="h-6 w-6 text-white" />
                      <span className="text-white font-medium">{label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !(amount || customAmount)}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mt-8"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Donation...</span>
                </div>
              ) : (
                <>
                  <HandHeart className="h-7 w-7" />
                  <span>Donate Now & Change Lives</span>
                </>
              )}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 text-center text-sm text-gray-300 mt-8">
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-green-400 mb-2" />
                <span>Secure Payment</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg">
                <Users className="h-6 w-6 text-red-400 mb-2" />
                <span>100% to Cause</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg">
                <Heart className="h-6 w-6 text-red-400 mb-2" />
                <span>Tax Deductible</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Donate;