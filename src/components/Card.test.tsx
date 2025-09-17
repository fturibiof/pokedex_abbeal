import { render, screen } from '@testing-library/react';
import Card from './Card';

const mockPokemon = {
  name: 'farfetchd',
  id: 83,
  sprites: { front_default: 'https://img.pokemondb.net/sprites/farfetchd.png' },
  types: [{ type: { name: 'normal' } }],
};

test('displays Pokémon sprite, number, and types', () => {
  render(<Card selectedPokemon={mockPokemon} loading={false} onClose={() => { }} />);

  expect(screen.getByRole('img')).toHaveAttribute('src', mockPokemon.sprites.front_default);
  expect(screen.getByText(/Number/)).toHaveTextContent('83');
  expect(screen.getByText(/Types:/)).toHaveTextContent('Normal');
});
