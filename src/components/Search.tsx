import { useState } from 'react';

interface SearchProps {
  onSearch: (name: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSearch(input.trim().toLowerCase());
      setInput('');
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search Pokémon by name"
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default Search;