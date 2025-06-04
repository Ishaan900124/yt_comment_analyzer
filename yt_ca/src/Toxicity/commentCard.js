import React from 'react';

const CommentCard = ({ user, comment, toxicity }) => {
  const getToxicityStyle = (label) => {
    const styles = {
      toxic: {
        background: 'linear-gradient(135deg, #f87171, #ef4444)',
        boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
      },
      severe_toxic: {
        background: 'linear-gradient(135deg, #b91c1c, #7f1d1d)',
        boxShadow: '0 2px 6px rgba(185, 28, 28, 0.4)',
      },
      obscene: {
        background: 'linear-gradient(135deg, #fb923c, #f97316)',
        boxShadow: '0 2px 6px rgba(249, 115, 22, 0.4)',
      },
      threat: {
        background: 'linear-gradient(135deg, #facc15, #eab308)',
        boxShadow: '0 2px 6px rgba(234, 179, 8, 0.4)',
      },
      insult: {
        background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
        boxShadow: '0 2px 6px rgba(59, 130, 246, 0.4)',
      },
      identity_hate: {
        background: 'linear-gradient(135deg, #a855f7, #9333ea)',
        boxShadow: '0 2px 6px rgba(147, 51, 234, 0.4)',
      },
    };

    return (
      styles[label.toLowerCase()] || {
        background: 'gray',
        color: 'white',
      }
    );
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

  const toxicityContainer = {
    width: '25%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  };

  const badgeStyleBase = {
    color: 'white',
    borderRadius: '9999px',
    fontSize: '13.5px',
    fontWeight: '600',
    padding: '8px 14px',
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
      <div style={toxicityContainer}>
        {toxicity.map((label, idx) => (
          <div
            key={idx}
            style={{
              ...badgeStyleBase,
              ...getToxicityStyle(label),
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentCard;
