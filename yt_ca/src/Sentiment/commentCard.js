import React from 'react';

const CommentCard = ({ user, comment, sentiment }) => {
  const getSentimentStyle = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return {
          background: 'linear-gradient(135deg, #34d399, #10b981)',
          boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)',
        };
      case 'negative':
        return {
          background: 'linear-gradient(135deg, #f87171, #ef4444)',
          boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
        };
      case 'neutral':
        return {
          background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
          boxShadow: '0 2px 6px rgba(59, 130, 246, 0.4)',
        };
      default:
        return {
          background: 'gray',
        };
    }
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

  const sentimentContainer = {
    width: '25%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const sentimentBadge = {
    ...getSentimentStyle(sentiment),
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
      <div style={sentimentContainer}>
        <div style={sentimentBadge}>{sentiment}</div>
      </div>
    </div>
  );
};

export default CommentCard;