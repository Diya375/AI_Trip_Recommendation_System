import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import API from '../../services/api';

export default function DiscussionBoard({ tripId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, [tripId]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/trips/${tripId}/comments`);
      setComments(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch comments", err);
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const tempComment = {
      id: Date.now(),
      user_id: -1, 
      name: "Me", 
      content: newComment,
      created_at: new Date().toISOString(),
      isTemp: true
    };
    
    setComments([...comments, tempComment]);
    setNewComment("");
    
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const res = await API.post(`/trips/${tripId}/comments`, { content: tempComment.content });
      setComments(prev => prev.map(c => c.id === tempComment.id ? res.data : c));
    } catch (err) {
      console.error("Failed to send comment", err);
      // Remove temp comment on failure
      setComments(prev => prev.filter(c => c.id !== tempComment.id));
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center gap-2">
        <MessageSquare size={18} className="text-[var(--accent)]" />
        <h3 className="font-bold text-sm text-[var(--text)]">Trip Discussion Board</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {loading ? (
          <p className="text-center text-xs text-[var(--text-dim)] animate-pulse">Loading comments...</p>
        ) : comments.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-dim)] opacity-60">
            <MessageSquare size={32} className="mb-2" />
            <p className="text-sm font-semibold">No comments yet</p>
            <p className="text-xs">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((c, i) => {
            const isMe = c.isTemp || c.name === "Me"; // In a real app, compare with current user ID
            return (
              <div key={c.id || i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                {!isMe && <span className="text-[10px] text-[var(--text-dim)] ml-1 mb-0.5">{c.name}</span>}
                <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[85%] shadow-sm ${
                  isMe 
                    ? 'bg-[var(--accent)] text-white rounded-br-none' 
                    : 'bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text)] rounded-bl-none'
                } ${c.isTemp ? 'opacity-70' : ''}`}>
                  {c.content}
                </div>
                <span className="text-[9px] text-[var(--text-dim)] mt-1 mx-1">
                  {new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-[var(--border)] bg-[var(--bg-subtle)] flex gap-2">
        <input 
          type="text" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..." 
          className="flex-1 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-full text-sm outline-none focus:border-[var(--accent)]/50 transition-colors text-[var(--text)]"
        />
        <button 
          type="submit"
          disabled={!newComment.trim()}
          className="p-2 bg-[var(--accent)] text-white rounded-full disabled:opacity-50 hover:bg-[var(--accent)]/90 transition-colors shadow-sm flex items-center justify-center"
        >
          <Send size={18} className="-ml-0.5" />
        </button>
      </form>
    </div>
  );
}
