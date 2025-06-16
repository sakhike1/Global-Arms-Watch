import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

const CurrentConflicts = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Military Analyst",
      text: "The situation in Ukraine continues to evolve with new developments in drone warfare.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: "Defense Expert",
      text: "The conflict in Gaza has significant implications for regional stability.",
      timestamp: "4 hours ago"
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to leave a comment.",
        variant: "destructive"
      });
      return;
    }

    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: currentUser.email.split('@')[0],
        text: newComment,
        timestamp: "Just now"
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
            Current Conflicts
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time analysis and discussion of ongoing global conflicts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Conflict Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-red-900/30"
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">Active Conflict Zones</h3>
            <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Interactive Map Coming Soon</p>
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-red-900/30"
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">Latest Comments</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={currentUser ? "Share your thoughts..." : "Sign in to leave a comment"}
                className="mb-4 bg-slate-900/50 border-red-900/30 text-white placeholder:text-gray-500"
                disabled={!currentUser}
              />
              {currentUser ? (
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                >
                  Post Comment
                </Button>
              ) : (
                <Button 
                  type="button"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                  onClick={() => toast({
                    title: "Authentication Required",
                    description: "Please sign in to leave a comment.",
                    variant: "destructive"
                  })}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in to Comment
                </Button>
              )}
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/50 rounded-lg p-4 border border-red-900/20"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-red-400">{comment.user}</span>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-300">{comment.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentConflicts; 