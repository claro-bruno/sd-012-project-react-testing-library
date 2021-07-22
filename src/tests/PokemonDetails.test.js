import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

beforeEach(() => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByText('More details'));
});

describe('Testa Pokemon Details', () => {
  const pokemon = data[0];
  const { name, summary, foundAt } = pokemon;
  describe('Testa as informações detalhadas do Pokémon', () => {
    it('Testa texto "name details"', () => {
      const header = screen.getByText(`${name} Details`);
      expect(header).toBeInTheDocument();
    });
    it('Testa heading summary', () => {
      const sumarry = screen.getByText('Summary');
      expect(sumarry).toBeInTheDocument();
    });
    it('Testa summary content', () => {
      const sumarryContent = screen.getByText(`${summary}`);
      expect(sumarryContent).toBeInTheDocument();
    });
  });
  describe('Testa se existe na pagina uma seção com os mapas', () => {
    it('Testa se na seção de detalhes existe um heading', () => {
      const heading = screen.getByText(`Game Locations of ${name}`);
      expect(heading).toBeInTheDocument();
    });
    it('Testa se as localiçoes sao mostradas na seção detalhes', () => {
      const locations = screen.getAllByAltText(`${name} location`);
      expect(locations.length).toBe(foundAt.length);
    });
    it('Testa se o nome das localizaçoes sao mostradas na seçao detalhe', () => {
      foundAt.forEach(({ location }) => {
        const findLocalName = screen.getByText(location);
        expect(findLocalName).toBeInTheDocument();
      });
    });
    it('Testa se e exibido uma imagem do mapa em cada localização', () => {
      foundAt.forEach(() => {
        const checkMap = screen.getAllByAltText(`${name} location`);
        checkMap.forEach((f) => expect(f).toBeInTheDocument());
      });
    });
    it('Testa se a imagem da localização possui atributo src com a url correta', () => {
      const checkUrl = screen.getAllByAltText(`${name} location`);
      checkUrl.forEach((map, i) => {
        expect(map.src).toBe(foundAt[i].map);
      });
    });
  });
  describe('Testa se o usuario pode favoritar um pokemon', () => {
    it('Testa se a pagina exibe um checkbox', () => {
      const findlabel = screen.getByLabelText('Pokémon favoritado?');
      expect(findlabel).toBeInTheDocument();
    });
    it('Testa cliques alternados no checkbox de favoritar', () => {
      const findlabel = screen.getByLabelText('Pokémon favoritado?');
      userEvent.click(findlabel);
      const findStar = screen.getByAltText(`${name} is marked as favorite`);
      expect(findStar).toBeInTheDocument();
      userEvent.click(findlabel);
      expect(findStar).not.toBeInTheDocument();
    });
  });
});
