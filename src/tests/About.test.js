import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './RenderWithRouter';

describe('testando pagina about', () => {
  it('testando o h2 na pagina para ver se tem o nome About Pokedex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('testa a pagina para ver se tem o conteudo sobre a pokedex', () => {
    renderWithRouter(<About />);
    const texto1 = screen.getByText(/This application simulates a Pokédex, a/i);
    const texto2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(texto1).toBeInTheDocument();
    expect(texto2).toBeInTheDocument();
  });

  it('testando a img na pagina', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
