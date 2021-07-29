import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

const p1 = 'This application simulates a Pokédex,'
+ ' a digital encyclopedia containing all Pokémons';
const p2 = 'One can filter Pokémons by type,'
+ ' and see more details for each one of them';

describe('Testa o componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex em 2 parágrafos', () => {
    render(<About />);
    expect(screen.getByText(p1)).toBeDefined();
    expect(screen.getByText(p2)).toBeDefined();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const h2 = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
