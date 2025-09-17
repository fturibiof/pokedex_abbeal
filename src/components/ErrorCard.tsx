import React from 'react';

interface ErrorCardProps {
  message?: string;
  onClose: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message, onClose }) => {

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <>
          <h2>Error!</h2>
          <p>{message}</p>
        </>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    color: 'black'
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '250px',
    position: 'relative' as const,
  },
  closeButton: {
    position: 'absolute' as const,
    top: '3px',
    right: '-4px',
    border: 'none',
    background: 'transparent',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: 'black'
  },
};

export default ErrorCard;