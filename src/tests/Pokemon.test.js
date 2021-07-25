import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetail = 'More details';
describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    const altText = 'Pikachu sprite';
    const image = screen.getByAltText(altText);
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
   para exibir detalhes deste Pokémon. O link deve possuir a URL
    /pokemons/<id>, onde <id> é o id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(moreDetail);
    expect(linkDetails).toBeInTheDocument();
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
   da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByText(moreDetail);
    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText(moreDetail);
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    fireEvent.click(screen.getByRole('checkbox'));
    const altText = 'Pikachu is marked as favorite';
    const image = screen.getByAltText(altText);
    expect(image.src).toBe('http://localhost/star-icon.svg');
  });
});
