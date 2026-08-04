import React, { useState, useEffect } from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

export default function NotificationsBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [activeRecommendation, setActiveRecommendation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Polling every 10s for real-time feel
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/notifications');
      const notifs = res.data;
      setNotifications(notifs);

      // Check for unread recommendation_ready notification to show modal
      const unreadRec = notifs.find(n => n.type === 'recommendation_ready' && !n.is_read);
      if (unreadRec && !showRecommendationModal) {
        setActiveRecommendation(unreadRec);
        setShowRecommendationModal(true);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const handleNotificationClick = (n) => {
    markAsRead(n.id);
    setIsOpen(false);
    if (n.link) {
      navigate(n.link);
    }
  };

  const closeRecommendationModal = () => {
    if (activeRecommendation) {
      markAsRead(activeRecommendation.id);
    }
    setShowRecommendationModal(false);
    setActiveRecommendation(null);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-[var(--bg-subtle)] transition-colors"
      >
        <Bell size={20} className="text-[var(--text)]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[var(--bg-card)]"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className="p-3 border-b border-[var(--border)] flex items-center justify-between">
            <h3 className="font-bold text-sm text-[var(--text)]">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] text-[var(--accent)] font-semibold bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-xs text-[var(--text-dim)] text-center">No notifications yet.</p>
            ) : (
              notifications.map(n => (
                <div 
                  key={n.id} 
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3 border-b border-[var(--border)] last:border-0 cursor-pointer hover:bg-[var(--bg-subtle)] transition-colors flex gap-3 ${!n.is_read ? 'bg-[var(--accent)]/5' : ''}`}
                >
                  <div className="mt-0.5">
                    {n.type === 'recommendation_ready' || n.type === 'destination_confirmed' ? '🎉' : '🔔'}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs ${!n.is_read ? 'font-bold text-[var(--text)]' : 'text-[var(--text-dim)]'}`}>
                      {n.message}
                    </p>
                    <p className="text-[9px] text-[var(--text-dim)] mt-1">
                      {new Date(n.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Group Recommendation Ready Modal */}
      {showRecommendationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-[var(--accent)]"></div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="cinzel text-xl font-bold text-[var(--accent)] mb-2">
                Your group's AI trip recommendation is ready!
              </h2>
              <p className="text-sm text-[var(--text-dim)] mb-6">
                The AI has analyzed everyone's preferences and found the perfect destination for your trip.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    closeRecommendationModal();
                    if(activeRecommendation?.link) navigate(activeRecommendation.link);
                  }}
                  className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  View Final Destination <ExternalLink size={16} />
                </button>
                <button 
                  onClick={closeRecommendationModal}
                  className="w-full py-2 rounded-xl bg-transparent border border-[var(--border)] text-[var(--text)] font-semibold text-xs hover:bg-[var(--bg-subtle)] transition-all"
                >
                  Dismiss for now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
