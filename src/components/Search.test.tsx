import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

test('calls onSearch with correct name', async () => {
  const mockSearch = jest.fn();
  render(<Search onSearch={mockSearch} />);

  const input = screen.getByPlaceholderText(/search pokémon/i);
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.type(input, 'farfetchd');
  await userEvent.click(button);

  expect(mockSearch).toHaveBeenCalledWith('farfetchd');
});