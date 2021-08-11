import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Pokedex tests', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Test title', () => {
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered pokémons');
  });

  it('Tests the `Próximo pokémon` button', () => {
    const button = screen.getByTestId('next-pokemon');
    expect(button).toHaveTextContent('Próximo pokémon');
    userEvent.click(button);
  });

  it('Check if there is filter buttons', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeDefined();
    userEvent.click(allButton);
    const types = screen.getAllByTestId('pokemon-type-button');
    expect(types.length).toBe(types.length);
    const bugButton = screen.getByRole('button', { name: 'Bug' });
    userEvent.click(bugButton);
  });
});
