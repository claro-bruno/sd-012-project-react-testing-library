import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import App from '../App';

const pokemon = data[0];
describe('Testa o compoente <PokemonDetails.js />', () => {
  it('informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    expect(details).not.toBeInTheDocument();
    const detailsPage = screen.getByRole('heading', { name: /pikachu details/i });
    expect(detailsPage).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Summary/i }));
    expect(screen.getByText(pokemon.summary)).toBeInTheDocument();
  });

  it('seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);

    const pokemonLocation = screen
      .getByRole('heading', { name: `Game Locations of ${pokemon.name}` });
    const displayedImage = screen.getAllByAltText('Pikachu location');
    const mapName = screen
      .getByText(pokemon.foundAt[0].location);

    expect(pokemonLocation).toBeInTheDocument();

    expect(displayedImage[0])
      .toHaveAttribute('src', expect.stringMatching(pokemon.foundAt[0].map));

    expect(displayedImage[0])
      .toHaveAttribute('alt', expect.stringMatching(`${pokemon.name} location`));

    expect(mapName).toBeInTheDocument();
  });
  it('favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(checkbox);

    const isFavorite = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(isFavorite).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(isFavorite).not.toBeInTheDocument();
  });
});
