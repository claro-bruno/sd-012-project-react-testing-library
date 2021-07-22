import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Se é renderizado um card com as informações de determinado pokémon', () => {
  const details = 'More details';

  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.innerHTML).toBe('Pikachu');
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toBe('Electric');
  });

  test('O peso médio do pokémon deve ser exibido com um texto no formato', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const img = screen.getByAltText('Pikachu sprite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const getLink = screen.getByRole('link', { name: details });
    expect(getLink).toBeInTheDocument();
    expect(getLink.href).toBe('http://localhost/pokemons/25');
  });

  test('Verifica se redirecionou para a pagina de Detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const getLink = screen.getByRole('link', { name: details });
    expect(getLink).toBeInTheDocument();
    userEvent.click(getLink);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('Se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    let url = history.location.pathname;
    expect(url).toBe('/');

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const getLink = screen.getByRole('link', { name: details });
    expect(getLink).toBeInTheDocument();
    userEvent.click(getLink);
    url = history.location.pathname;

    expect(url).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritado', () => {
    const { history } = renderWithRouter(<App />);
    let url = history.location.pathname;
    expect(url).toBe('/');

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const getLink = screen.getByRole('link', { name: details });
    expect(getLink).toBeInTheDocument();

    userEvent.click(getLink);
    url = history.location.pathname;
    expect(url).toBe('/pokemons/25');

    const pokeFav = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(pokeFav);

    const getFavLinkPage = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(getFavLinkPage).toBeInTheDocument();

    userEvent.click(getFavLinkPage);
    url = history.location.pathname;
    expect(url).toBe('/favorites');

    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('http://localhost/star-icon.svg');
  });
});
