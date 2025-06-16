import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface CommentsProps {
  topicId: number;
}

const Comments = ({ topicId }: CommentsProps) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  // Fetch comments for this topic
  useEffect(() => {
    fetchComments();
  }, [topicId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('topic_id', topicId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to comment",
        variant: "destructive"
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please enter a comment",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          topic_id: topicId,
          user_id: currentUser.id,
          content: newComment.trim()
        })
        .select()
        .single();

      if (error) throw error;

      setComments([...comments, data]);
      setNewComment("");
      
      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!currentUser) return;

    setDeletingCommentId(commentId);

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', currentUser.id);

      if (error) throw error;

      setComments(comments.filter(comment => comment.id !== commentId));
      
      toast({
        title: "Comment Deleted",
        description: "Your comment has been deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive"
      });
    } finally {
      setDeletingCommentId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="text-gray-400 text-center py-4">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      {currentUser && (
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 rounded-lg p-4 shadow-lg shadow-black/20">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-white/5 border-white/5 text-white/90 placeholder:text-white/40 focus:border-red-500/10 focus:ring-1 focus:ring-red-500/10 transition-all duration-200 min-h-24"
            />
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-red-600/90 to-red-500/90 hover:from-red-500 hover:to-red-400 text-white/90 hover:text-white px-6 py-2 transition-all duration-300 hover:scale-105"
              >
                Post Comment
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div 
            key={comment.id}
            className="bg-white/5 backdrop-blur-lg border border-white/5 rounded-lg p-4 hover:border-red-500/10 transition-all duration-300 group shadow-lg shadow-black/20"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600/90 to-red-500/90 flex items-center justify-center text-white/90 font-semibold shadow-lg shadow-black/20">
                  {comment.user_id[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-white/80 font-semibold group-hover:text-red-400/90 transition-colors">
                    {comment.user_id}
                  </p>
                  <p className="text-white/50 text-sm">{formatDate(comment.created_at)}</p>
                </div>
              </div>
              {currentUser && currentUser.id === comment.user_id && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteComment(comment.id)}
                  disabled={deletingCommentId === comment.id}
                  className="text-red-400/80 hover:text-red-300 hover:bg-red-900/20 p-1 h-auto"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-white/80 pl-10">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* No Comments State */}
      {comments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-white/50">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
