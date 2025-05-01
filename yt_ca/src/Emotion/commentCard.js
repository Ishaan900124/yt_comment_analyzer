import React from 'react';

const CommentCard = ({ user, comment, emotion }) => {
  const emotionColors = {
    admiration: ['#a78bfa', '#8b5cf6'],
    amusement: ['#fcd34d', '#fbbf24'],
    anger: ['#ef4444', '#dc2626'],
    annoyance: ['#f97316', '#ea580c'],
    approval: ['#34d399', '#10b981'],
    caring: ['#f472b6', '#ec4899'],
    confusion: ['#facc15', '#eab308'],
    curiosity: ['#7dd3fc', '#38bdf8'],
    desire: ['#fb7185', '#f43f5e'],
    disappointment: ['#94a3b8', '#64748b'],
    disapproval: ['#a1a1aa', '#71717a'],
    disgust: ['#6b7280', '#4b5563'],
    embarrassment: ['#fda4af', '#fb7185'],
    excitement: ['#c084fc', '#a855f7'],
    fear: ['#f87171', '#ef4444'],
    gratitude: ['#34d399', '#10b981'],
    grief: ['#9ca3af', '#6b7280'],
    joy: ['#fde68a', '#fbbf24'],
    love: ['#fb7185', '#f43f5e'],
    nervousness: ['#fcd34d', '#fbbf24'],
    optimism: ['#86efac', '#4ade80'],
    pride: ['#60a5fa', '#3b82f6'],
    realization: ['#67e8f9', '#22d3ee'],
    relief: ['#a7f3d0', '#6ee7b7'],
    remorse: ['#fca5a5', '#f87171'],
    sadness: ['#93c5fd', '#60a5fa'],
    surprise: ['#fbbf24', '#f59e0b'],
  };

  const getEmotionStyle = (emotion) => {
    const gradient = emotionColors[emotion.toLowerCase()];
    if (gradient) {
      return {
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        boxShadow: `0 2px 6px ${gradient[1]}66`,
      };
    }
    return {
      background: 'gray',
    };
  };

  const cardStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: '20px 28px',
    margin: '18px 0',
    borderRadius: '18px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    fontFamily: 'Segoe UI, sans-serif',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const userStyle = {
    width: '20%',
    fontWeight: '600',
    fontSize: '15px',
    color: '#ef4444',
    backgroundColor: '#ffe4e6',
    padding: '6px 12px',
    borderRadius: '20px',
    textAlign: 'center',
    marginTop: '6px',
  };

  const commentWrapperStyle = {
    width: '55%',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

  const commentStyle = {
    backgroundColor: '#f9fafb',
    padding: '14px 16px',
    borderRadius: '12px',
    fontSize: '15.5px',
    lineHeight: '1.6',
    fontWeight: '500',
    color: '#1f2937',
    borderLeft: '4px solid #cbd5e1',
    whiteSpace: 'pre-wrap',
  };

  const emotionContainer = {
    width: '25%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const emotionBadge = {
    ...getEmotionStyle(emotion),
    color: 'white',
    borderRadius: '9999px',
    fontSize: '13.5px',
    fontWeight: '600',
    padding: '8px 18px',
    textTransform: 'capitalize',
    minWidth: '90px',
    textAlign: 'center',
    transition: 'transform 0.2s ease',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.015)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
      }}
    >
      <div style={userStyle}>{user}</div>
      <div style={commentWrapperStyle}>
        <div style={commentStyle}>{comment}</div>
      </div>
      <div style={emotionContainer}>
        <div style={emotionBadge}>{emotion}</div>
      </div>
    </div>
  );
};

export default CommentCard;
