import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Comments from "./Comments";

const TopicsSection = () => {
  const { currentUser } = useAuth();
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "China's Military Modernization Program",
      content: "Analysis of China's rapid military advancement and its implications for regional security...",
      author: "DefenseAnalyst",
      comments: 24,
      category: "Military Analysis"
    },
    {
      id: 2,
      title: "Nuclear Deterrence Theory in 2024",
      content: "How nuclear deterrence strategies are evolving in the modern geopolitical landscape...",
      author: "NuclearExpert",
      comments: 18,
      category: "Nuclear Policy"
    },
    {
      id: 3,
      title: "Hypersonic Weapons Development",
      content: "The race for hypersonic weapons and their impact on global military balance...",
      author: "TechStrategist",
      comments: 31,
      category: "Technology"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: "", content: "", category: "" });
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create topics.",
        variant: "destructive"
      });
      return;
    }

    if (!newTopic.title || !newTopic.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and content.",
        variant: "destructive"
      });
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
    
    toast({
      title: "Topic Created",
      description: "Your topic has been created successfully!",
    });
  };

  const handleCommentClick = (topicId: number) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to comment on topics.",
        variant: "destructive"
      });
    } else {
      setExpandedTopic(expandedTopic === topicId ? null : topicId);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black via-red-950/20 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-30"></div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            DISCUSSION <span className="text-red-500">TOPICS</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Share insights, analysis, and discussions about military developments and global security
          </p>
          
          {currentUser ? (
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
            >
              {showCreateForm ? "Cancel" : "Create Topic"}
            </Button>
          ) : (
            <p className="text-white/80">Sign in to create topics and participate in discussions</p>
          )}
        </div>

        {showCreateForm && currentUser && (
          <Card className="bg-white/5 backdrop-blur-lg border-white/5 hover:border-red-500/10 transition-all hover:scale-[1.02] mb-8 shadow-lg shadow-black/20">
            <CardHeader>
              <CardTitle className="text-white">Create New Topic</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTopic} className="space-y-4">
                <div>
                  <Input
                    placeholder="Topic Title"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                    className="bg-white/5 border-white/5 text-white placeholder:text-white/50 focus:border-red-500/20"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Category (e.g., Military Analysis, Nuclear Policy)"
                    value={newTopic.category}
                    onChange={(e) => setNewTopic({...newTopic, category: e.target.value})}
                    className="bg-white/5 border-white/5 text-white placeholder:text-white/50 focus:border-red-500/20"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Topic content and analysis..."
                    value={newTopic.content}
                    onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
                    className="bg-white/5 border-white/5 text-white placeholder:text-white/50 focus:border-red-500/20 min-h-32"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-red-600/90 to-red-500/90 hover:from-red-500 hover:to-red-400 text-white px-6 py-2 transition-all duration-300 hover:scale-105"
                >
                  Create Topic
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {topics.map((topic) => (
            <Card 
              key={topic.id} 
              className="bg-white/5 backdrop-blur-lg border-white/5 hover:border-red-500/10 transition-all hover:scale-[1.02] group shadow-lg shadow-black/20"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl mb-2 group-hover:text-red-400 transition-colors">
                      {topic.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-white/80">
                      <span>By {topic.author}</span>
                      <span>•</span>
                      <span>{topic.comments} comments</span>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="border-red-500/20 text-red-400 bg-red-950/10 group-hover:bg-red-950/20 transition-colors"
                  >
                    {topic.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 mb-4">{topic.content}</p>
                <div className="flex space-x-4 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/20 text-red-400 hover:bg-red-600/20 hover:text-white transition-all duration-300"
                    onClick={() => handleCommentClick(topic.id)}
                  >
                    {expandedTopic === topic.id ? "Hide Comments" : "View Comments"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    Share
                  </Button>
                </div>
                
                {expandedTopic === topic.id && (
                  <div className="border-t border-white/5 pt-4">
                    <Comments topicId={topic.id} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsSection;
