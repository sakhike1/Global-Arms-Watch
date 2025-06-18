import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Comments from "./Comments";
import { 
  MessageSquare, 
  User, 
  PlusCircle, 
  ChevronDown,
  Flame // A thematic icon for a hot topic
} from "lucide-react";

// Framer Motion variants for staggered list animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const TopicsSection = () => {
  const { currentUser } = useAuth();
  const [topics, setTopics] = useState([
    { id: 1, title: "China's Military Modernization Program", content: "Analysis of China's rapid military advancement and its implications...", author: "DefenseAnalyst", comments: 24, category: "Military Analysis" },
    { id: 2, title: "Nuclear Deterrence Theory in 2024", content: "How nuclear deterrence strategies are evolving in the modern geopolitical landscape...", author: "NuclearExpert", comments: 18, category: "Nuclear Policy" },
    { id: 3, title: "The Race for Hypersonic Weapons", content: "The impact of hypersonic weapons on the global military balance and strategic stability...", author: "TechStrategist", comments: 31, category: "Technology" }
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: "", content: "", category: "" });
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast({ title: "Authentication Required", description: "Please sign in to create topics.", variant: "destructive" });
      return;
    }
    if (!newTopic.title || !newTopic.content) {
      toast({ title: "Missing Information", description: "Please fill in both title and content.", variant: "destructive" });
      return;
    }
    const topic = {
      id: topics.length + 1,
      title: newTopic.title,
      content: newTopic.content,
      author: currentUser.email?.split('@')[0] || "User",
      comments: 0,
      category: newTopic.category || "General"
    };
    setTopics([topic, ...topics]);
    setNewTopic({ title: "", content: "", category: "" });
    setShowCreateForm(false);
    toast({ title: "Topic Created", description: "Your discussion has been successfully posted." });
  };

  const handleCommentClick = (topicId: number) => {
    if (!currentUser) {
      toast({ title: "Authentication Required", description: "Please sign in to view and post comments.", variant: "destructive" });
    } else {
      setExpandedTopic(expandedTopic === topicId ? null : topicId);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-black relative overflow-hidden">
      {/* Dynamic Animated Grid Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[radial-gradient(#ff00001a_1px,transparent_1px)] [background-size:32px_32px]"
          style={{
            maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%,#000 70%,transparent 110%)"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Discussions</span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
            Engage with expert analysis on global security, military technology, and geopolitical strategy.
          </p>
          
          {currentUser && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <PlusCircle className="mr-2 h-6 w-6" />
                {showCreateForm ? "Cancel Creation" : "Start a New Topic"}
              </Button>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {showCreateForm && currentUser && (
            <motion.div
              initial={{ opacity: 0, y: -30, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -30, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mb-8"
            >
              <Card className="bg-black/50 backdrop-blur-lg border border-red-500/30 shadow-lg shadow-red-900/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-2"><Flame className="text-red-400"/>Create a New Discussion Topic</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateTopic} className="space-y-4">
                    <Input placeholder="Topic Title" value={newTopic.title} onChange={(e) => setNewTopic({...newTopic, title: e.target.value})} className="bg-black/30 border-white/20 text-white placeholder:text-white/50 focus:border-red-500" />
                    <Input placeholder="Category (e.g., Military Analysis)" value={newTopic.category} onChange={(e) => setNewTopic({...newTopic, category: e.target.value})} className="bg-black/30 border-white/20 text-white placeholder:text-white/50 focus:border-red-500" />
                    <Textarea placeholder="Start your analysis..." value={newTopic.content} onChange={(e) => setNewTopic({...newTopic, content: e.target.value})} className="bg-black/30 border-white/20 text-white placeholder:text-white/50 focus:border-red-500 min-h-32" />
                    <Button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-6 transition-all duration-300">Submit Topic</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {topics.map((topic) => (
            <motion.div key={topic.id} variants={itemVariants}>
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-red-500/50 group shadow-lg shadow-black/30 overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-white text-2xl mb-2 group-hover:text-red-400 transition-colors duration-300">
                        {topic.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <span className="flex items-center gap-1.5"><User size={14} />{topic.author}</span>
                        <span className="flex items-center gap-1.5"><MessageSquare size={14} />{topic.comments} Comments</span>
                      </div>
                    </div>
                    {topic.category && <Badge variant="outline" className="border-red-500/30 text-red-400 bg-red-950/20 whitespace-nowrap">{topic.category}</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-6">{topic.content}</p>
                  <div className="flex space-x-4">
                    <Button onClick={() => handleCommentClick(topic.id)} className="bg-red-600/10 text-red-400 border border-red-500/30 hover:bg-red-600/20 hover:text-white hover:border-red-500 transition-all duration-300">
                      {expandedTopic === topic.id ? "Hide Comments" : "View Comments"}
                      <motion.div animate={{ rotate: expandedTopic === topic.id ? 180 : 0 }}>
                        <ChevronDown className="ml-2 h-4 w-4"/>
                      </motion.div>
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {expandedTopic === topic.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 pt-6 mt-6">
                          <Comments topicId={topic.id} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopicsSection;