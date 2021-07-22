import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  const moreDetails = 'More details';
  it('Teste se as informações detalhadas do Pokémon '
  + 'selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(moreDetails);
    const summaryParag = pokemons[0].summary;

    fireEvent.click(details);
    const name = screen.getByTestId('pokemon-name').innerHTML;
    const h2Name = screen.getByText(`${name} Details`);
    const h2Summary = screen.getByText('Summary');
    const summary = screen.getByText(summaryParag);
    expect(h2Summary).toBeInTheDocument();
    expect(h2Name).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os '
  + 'mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(moreDetails);

    fireEvent.click(details);
    const name = screen.getByTestId('pokemon-name').innerHTML;
    const h2 = screen.getByText(`Game Locations of ${name}`);
    expect(h2).toBeInTheDocument();

    const imgs = screen.getAllByAltText(`${name} location`);
    const src = pokemons[0].foundAt[0].map;
    expect(imgs[0]).toHaveAttribute('src', src);
    expect(imgs[0]).toHaveAttribute('alt', `${name} location`);
  });

  it('Teste se o usuário pode favoritar um pokémon '
  + 'através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(moreDetails);

    fireEvent.click(details);
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
  });
});
