import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// npx stryker run ./stryker/PokemonDetails.conf.json

describe('7. Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const pikachuLink = screen.getByRole('link', { name: /More Details/i });
    expect(pikachuLink).toBeInTheDocument();
    userEvent.click(pikachuLink);
  });

  it('Verifica se os headings têm o texto correto.', () => {
    const headingsList = screen.getAllByRole('heading', { level: 2 });

    expect(headingsList[0]).toHaveTextContent(/Pikachu Details/i);
    expect(headingsList[1]).toHaveTextContent(/Summary/i);
    expect(headingsList[2]).toHaveTextContent(/Game Locations of Pikachu/i);
  });

  it('Informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const pikachuText = 'This intelligent Pokémon roasts hard berries with'
    + ' electricity to make them tender enough to eat.';
    const pikachu = screen.getByText(pikachuText);
    expect(pikachu).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const pikachuLocations = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(pikachuLocations[0].src).toBe(
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(pikachuLocations[1].src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  it('O label do checkbox deve conter o texto Pokémon favoritado.', () => {
    const favoriteCheckButton = screen.getByRole(
      'checkbox',
      { name: /Pokémon favoritado/i },
    );
    expect(favoriteCheckButton).toBeInTheDocument();
  });
});
