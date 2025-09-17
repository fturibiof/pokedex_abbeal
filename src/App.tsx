import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import Card from './components/Card';
import Search from './components/Search';
import ErrorCard from './components/ErrorCard';

interface PokemonBase {
  name: string;
  url: string;
}


const LIMIT = 20;
const URL = `https://pokeapi.co/api/v2/pokemon`;

function App() {
  const [items, setItems] = useState<PokemonBase[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}?limit=${LIMIT}&offset=${offset}`);
      const data: PokemonBase[] = response.data?.results;

      setItems(data);
      setHasMore(data.length === LIMIT);
    } catch (error) {
      console.error('Error fetching data:', error);
      setItems([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const handleNext = () => {
    if (hasMore) setOffset(prev => prev + LIMIT);
  };

  const handlePrev = () => {
    if (offset >= LIMIT) setOffset(prev => prev - LIMIT);
  };

  const handleClick = async (url: string) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(url);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error('Failed to fetch Pokémon details:', error);
      setSelectedPokemon(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleSearch = async (name: string) => {
    setLoadingDetails(true);
    setLoading(true);
    setSelectedPokemon(null);
    try {
      const res = await axios.get(`${URL}/${name}`);
      setSelectedPokemon(res.data);
    } catch (err) {
      console.error('Pokémon not found:', err);
      setError('Pokémon not found');
    } finally {
      setLoading(false);
      setLoadingDetails(false);
    }
  };


  const handleClose = () => {
    setSelectedPokemon(null);
  };

  const handleCloseError = () => {
    setError('');
  };


  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h1>Pokedex</h1>
        <div style={{ marginBottom: '30px' }}>
          <Search onSearch={handleSearch} />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul style={{ padding: 0 }}>
            {items.map((item) => (
              <li key={item.name} style={{ marginTop: '1rem' }}>
                <button style={{ width: '200px' }} onClick={() => handleClick(item.url)}>
                  {item.name[0].toLocaleUpperCase() + item.name.slice(1)}
                </button>
              </li>
            ))}
          </ul>

        )}

        <div style={{ marginTop: '1rem', display: 'flex', gap: '200px' }}>
          <button onClick={handlePrev} disabled={offset === 0}>
            &lt;
          </button>
          <button onClick={handleNext} disabled={!hasMore}>
            &gt;
          </button>
        </div>
      </div>
      {loadingDetails && <p>Loading details...</p>}

      {selectedPokemon && (
        <Card selectedPokemon={selectedPokemon} loading={loadingDetails} onClose={handleClose} />
      )}

      {error && (
        <ErrorCard message={error} onClose={handleCloseError} />
      )}

    </>
  )
}

export default App;
