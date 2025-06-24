
import React, { useState } from 'react';

export default function ToDoNotes({ confidentTasksList }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: isOpen ? '320px' : '55px',
        height: isOpen ? '420px' : '55px',
        background: 'rgba(255, 255, 255, 0.51)',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.77)',
        color: '#1e1e1e',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
      }}
      aria-expanded={isOpen}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='tbtn'
        aria-label={isOpen ? 'Collapse notes' : 'Expand notes'}
        title={isOpen ? 'Collapse notes' : 'Expand notes'}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#333',
          fontSize: isOpen ? '20px' : '26px',
          fontWeight: 'bold',
          cursor: 'pointer',
          padding: '5px 8px',
          alignSelf: 'flex-end',
          transition: 'all 0.2s',
          opacity:"1"
        }}
      >
        {isOpen ? '✕' : '📝'}
      </button>

      {/* Notes Content */}
      {isOpen && (
        <div
          style={{
            padding: '14px',
            flexGrow: 1,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <h3
            style={{
              margin: 0,
              marginBottom: '14px',
              fontSize: '18px',
              color: '#222',
              fontWeight: 600,
              borderBottom: '1px solid #ccc',
              paddingBottom: '8px',
            }}
          >
            ✅ Your Confident Skills
          </h3>

          {confidentTasksList?.length === 0 ? (
            <p
              style={{
                fontStyle: 'italic',
                fontSize: '14px',
                color: '#666',
              }}
            >
              No confident tasks yet.
            </p>
          ) : (
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {confidentTasksList.map((task, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: '10px',
                    fontSize: '15px',
                    color: '#333',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: '#10b981', fontSize: '18px' }}>✔</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
