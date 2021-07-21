import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText('About'));
});

const aboutImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testa a página About', () => {
  it('Testa se contém as informações sobre a pokédex', () => {
    const pokedexInfo = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('Testa de tem um h2 com o texto about pokedex', () => {
    const headerTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(headerTitle).toBeDefined();
  });

  it('Testa se tem uma imagem de uma pokedex', () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', aboutImage);
  });
});
