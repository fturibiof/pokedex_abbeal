import React from 'react';

interface CardProps {
  selectedPokemon: any;
  loading: boolean;
  onClose: () => void;
}

interface PokemonType {
  slot: number,
  type: {
    name: string,
    url: string
  }
}

const Card: React.FC<CardProps> = ({ selectedPokemon, loading, onClose }) => {
  if (!selectedPokemon && !loading) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        {loading ? (
          <p>Loading Pokémon details...</p>
        ) : (
          <>
            <h2>{selectedPokemon.name.toUpperCase()}</h2>
            <h3>Number {selectedPokemon.id}</h3>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <p>Types: {selectedPokemon.types.map((t: PokemonType) => (t.type.name[0]).toLocaleUpperCase() + t.type.name.slice(1)).join(', ')}</p>
          </>
        )}
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

export default Card;