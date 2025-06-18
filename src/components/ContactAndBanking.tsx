import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DatabaseIcon, 
  MailIcon, 
  UserIcon, 
  SendIcon,
  CopyIcon,
  XIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Add this interface at the top of the file, after the imports
interface BankingDetail {
  accountName: string;
  accountNumber: string;
  branchCode: string;
  swiftCode: string;
}

interface BankingDetails {
  [key: string]: BankingDetail;
}

export default function ContactAndBanking() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
    selectedBank: ''
  });
  const { toast } = useToast();

  // Add type annotation to bankingDetails
  const bankingDetails: BankingDetails = {
    'Standard Bank': {
      accountName: 'Global Arms Watch',
      accountNumber: '1234567890',
      branchCode: '051001',
      swiftCode: 'SBZAZAJJ'
    },
    'First National Bank': {
      accountName: 'Global Arms Watch',
      accountNumber: '9876543210',
      branchCode: '250655',
      swiftCode: 'FIRNZAJJ'
    }
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `${fieldName} has been copied.`,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll be in touch soon.",
    });
    setFormData({ name: '', surname: '', email: '', message: '', selectedBank: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClearBankSelection = () => {
    setFormData(prev => ({ ...prev, selectedBank: '' }));
  };

  const inputStyles = "bg-white/10 border border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-offset-0 focus:ring-red-500/70 transition-all duration-300";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-br from-gray-900 via-red-900 to-black">
      
      <motion.div 
        animate={{ x: [-100, 100, -100], y: [-50, 50, -50], rotate: [0, 180, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-600 to-orange-400 rounded-full filter blur-3xl opacity-30"
      />
      <motion.div 
        animate={{ x: [100, -100, 100], y: [50, -150, 50], rotate: [0, -180, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-500 to-red-800 rounded-full filter blur-3xl opacity-20"
      />

      {/* The Glassmorphism Form Card with new dimensions */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        // CHANGED: Increased max-width from 3xl to 4xl
        className="w-full max-w-4xl bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl text-white"
      >
        {/* CHANGED: Reduced padding from p-8 to p-6 and font-size from 4xl to 3xl */}
        <div className="p-6 text-center border-b border-white/10">
          <h2 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
            <MailIcon className="w-8 h-8" />
            Get in Touch
          </h2>
          <p className="text-gray-300 mt-2">Send us a message or find our banking details below.</p>
        </div>

        {/* CHANGED: Reduced padding from p-8 to p-6 and vertical spacing from space-y-6 to space-y-4 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* CHANGED: Reduced grid gap from gap-6 to gap-5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-200"><UserIcon className="w-5 h-5" /> Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" className={inputStyles} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-200"><UserIcon className="w-5 h-5" /> Surname</Label>
              <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} required placeholder="Your Surname" className={inputStyles} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-200"><MailIcon className="w-5 h-5" /> Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" className={inputStyles} />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-200">Message</Label>
            {/* CHANGED: Reduced min-height of the textarea */}
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us how we can help..." className={`${inputStyles} min-h-[100px]`} />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-200"><DatabaseIcon className="w-5 h-5" /> Banking Details</Label>
            <Select value={formData.selectedBank} onValueChange={(value) => setFormData(prev => ({ ...prev, selectedBank: value }))}>
              <SelectTrigger className={inputStyles}>
                <SelectValue placeholder="Select a bank to view details" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/80 backdrop-blur-lg border-white/20 text-white">
                {Object.keys(bankingDetails).map((bank) => (
                  <SelectItem key={bank} value={bank} className="focus:bg-white/20">
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formData.selectedBank && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20 space-y-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{formData.selectedBank} Details</h3>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-300 hover:bg-white/20 hover:text-white" onClick={handleClearBankSelection}>
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>
                
                {Object.entries(bankingDetails[formData.selectedBank]).map(([key, value]) => {
                  const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="flex justify-between items-center text-sm py-1 border-b border-white/10 last:border-b-0">
                      <p><span className="font-medium text-gray-300">{fieldName}:</span> {value}</p>
                      <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/20" onClick={() => handleCopy(value, fieldName)}>
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="submit" className="w-full h-12 text-lg font-semibold flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-gray-200 transition-colors duration-300">
              <SendIcon className="w-5 h-5" /> Send Message
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}