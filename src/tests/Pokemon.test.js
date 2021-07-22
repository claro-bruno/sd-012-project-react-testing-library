import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import Alakazam from '../__mocks__/data';
import App from '../App';

jest.mock('../data');

const { averageWeight: { measurementUnit, value }, id, image, name, type } = Alakazam[0];
const middleWeight = `Average weight: ${value} ${measurementUnit}`;

describe('Testa componente Pokemon', () => {
  describe(`Verifica se é renderizado um card com as informações de
    determinado pokémon.`, () => {
    it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
      renderWithRouter(<App />);
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('O tipo correto do Pokémon deve ser mostrado na tela;', () => {
      renderWithRouter(<App />);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    });

    it(`O peso médio correto do Pokémon deve ser mostrado na tela
      com o formato "Average weight: <value> <measurementUnit>"`, () => {
      renderWithRouter(<App />);
      expect(screen.getByText(middleWeight)).toBeInTheDocument();
    });

    it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src
      com a URL da imagem e um atributo alt com o texto <name> sprite`, () => {
      renderWithRouter(<App />);
      const pokeImg = screen.getByRole('img', { name: `${name} sprite` });
      expect(pokeImg).toHaveAttribute('src', image);
    });
  });

  describe('Verifica Links de navegação', () => {
    it(`O card deve conter um link de navegação para exibir detalhes deste
    Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do
    Pokémon exibido;`, () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('link', {
        name: /More details/i,
      })).toHaveAttribute('href', `/pokemons/${id}`);
    });
    it(`Ao clicar no link de navegação do Pokémon, é feito o redirecionamento da
      aplicação para a página de detalhes de Pokémon com a URL "/pokemons/<id>".`, () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /More details/i }));
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${id}`);
      expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    });

    it('Deve existir um ícone de estrela nos Pokémons favoritados', () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
      expect(screen.getByRole('img', {
        name: `${name} is marked as favorite`,
      })).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
