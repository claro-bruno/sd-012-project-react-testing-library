import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('este se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
    const p1 = 'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons';
    const p2 = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';

    const p1El = screen.getByText(p1);
    const p2El = screen.getByText(p2);

    expect(p1El).toHaveTextContent(p1);
    expect(p2El).toHaveTextContent(p2);
  });

  it('Teste se a página contém h2 com texto About Pokédex', () => {
    render(<About />);
    const h2 = screen.getByRole('heading');
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const str1 = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const str2 = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';

    render(<About />);
    const p1 = screen.getByText(str1);
    const p2 = screen.getByText(str2);
    expect(p1).toHaveTextContent(str1);
    expect(p2).toHaveTextContent(str2);
  });

  it('Verifica se a imagem existe', () => {
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_'
    + 'Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    render(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toBe(url);
  });
});
