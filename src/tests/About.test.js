import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './RenderWithRouter';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('Testando componente "About"', () => {
  it('Testando se a página contém as informações sobre a Pokedéx', () => {
    const text1 = screen.getByText(/This application simulates a Pokédex,/i);
    const text2 = screen.getByText(/One can filter Pokémons by type,/i);

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
  });

  it('A página deve conter um heading H2 com o texto "About Pokédex"', () => {
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeDefined();
  });

  it('A página deve conter dois parágrafos com texto sobre a Pokédex ', () => {
    const article = screen.getAllByText(/Pokémons/i);
    expect(article.length).toBe(2);
  });
  it('Testando se a pagina contém a imagem de uma Pokédex', () => {
    const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageSrc = screen.getByRole('img', { src: img });
    // const image = screen.getByRole('img', { src: img });

    expect(imageSrc).toHaveAttribute('src', img);
    // expect(image).toBeDefined();
  });
});
