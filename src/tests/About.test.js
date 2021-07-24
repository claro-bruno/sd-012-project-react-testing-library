import React from 'react';
import { screen } from '@testing-library/react';
// import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o componente About.js', () => {
  test('Verificando h2, Paragrafos e Imagem ', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(header).toBeInTheDocument();

    const p1 = /This application simulates a Pokédex/i;
    const p2 = /One can filter Pokémons by type/i;

    expect(screen.getByText(p1)).toBeInTheDocument();
    expect(screen.getByText(p2)).toBeInTheDocument();

    const paragrafos = screen.getAllByText(/Pokémons/i);
    expect(paragrafos.length).toBe(2);

    const URL_SRC_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // const img = screen.getByRole('img', { src: URL_SRC_IMG });
    // expect(img).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveProperty('src', URL_SRC_IMG);
  });
});
