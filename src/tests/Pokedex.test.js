import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('requisito 5- testa componente Pokedex.js', () => {
  it('nome do pokemon deve ser Pikachu', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'All' }));

    const PokeName = screen.getByTestId('pokemon-name');
    expect(PokeName).toBeInTheDocument();
    expect(PokeName.innerHTML).toBe('Pikachu');

    userEvent.click(screen.getByRole('button', { name: 'Electric' }));

    const PokeName1 = screen.getByTestId('pokemon-name');
    expect(PokeName1).toBeInTheDocument();
    expect(PokeName1.innerHTML).toBe('Pikachu');
  });

  it('o tipo do pokemon mostrado na tela deve estar correto', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'All' }));

    const PokeType = screen.getByTestId('pokemon-type');
    expect(PokeType).toBeInTheDocument();
    expect(PokeType.innerHTML).toBe('Electric');

    userEvent.click(screen.getByRole('button', { name: 'Electric' }));

    const PokeType1 = screen.getByTestId('pokemon-type');
    expect(PokeType1).toBeInTheDocument();
    expect(PokeType1.innerHTML).toBe('Electric');
  });

  it('o peso medio do pokemon deve ser mostrado de forma correta', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'All' }));

    const PokeWeight = screen.getByTestId('pokemon-weight');
    expect(PokeWeight).toBeInTheDocument();
    expect(PokeWeight.innerHTML).toBe('Average weight: 6.0 kg');

    userEvent.click(screen.getByRole('button', { name: 'Electric' }));

    const PokeWeight1 = screen.getByTestId('pokemon-weight');
    expect(PokeWeight1).toBeInTheDocument();
    expect(PokeWeight1.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('a imagem do pokemon deve aparecer na tela com URL e atributo alt corretos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'All' }));

    const imgName = 'Pikachu sprite';
    const PokeImg = screen.getByRole('img', { name: imgName });
    expect(PokeImg).toBeInTheDocument();
    expect(PokeImg.alt).toBe(imgName);
    expect(PokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    userEvent.click(screen.getByRole('button', { name: 'Electric' }));

    const PokeImg1 = screen.getByRole('img', { name: imgName });
    expect(PokeImg1).toBeInTheDocument();
    expect(PokeImg1.alt).toBe(imgName);
    expect(PokeImg1.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('o card contem o link de navegacao correto para os detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const linkNameMd = 'More details';
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    userEvent.click(screen.getByRole('link', { name: linkNameMd }));

    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');

    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    userEvent.click(screen.getByRole('link', { name: linkNameMd }));

    const path1 = history.location.pathname;
    expect(path1).toBe('/pokemons/25');
  });

  it('exibe estrela em pokemon favoritado Pikachu', () => {
    renderWithRouter(<App />);
    const linkNameMdPk = 'More details';
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    userEvent.click(screen.getByRole('link', { name: linkNameMdPk }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Home' }));

    const favImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favImg).toBeInTheDocument();
    expect(favImg.alt).toBe('Pikachu is marked as favorite');
    expect(favImg.src).toBe('http://localhost/star-icon.svg');

    userEvent.click(screen.getByRole('button', { name: 'Bug' }));
    userEvent.click(screen.getByRole('link', { name: linkNameMdPk }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    userEvent.click(screen.getByRole('button', { name: 'Bug' }));

    const favImg1 = screen.getByRole('img', { name: 'Caterpie is marked as favorite' });
    expect(favImg1).toBeInTheDocument();
    expect(favImg1.alt).toBe('Caterpie is marked as favorite');
    expect(favImg1.src).toBe('http://localhost/star-icon.svg');
  });
});
