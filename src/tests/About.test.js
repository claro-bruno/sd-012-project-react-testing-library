import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('About Pokédex');

    const paragraph = screen.getAllByText(/pokémon/i);
    expect(paragraph).toHaveLength(2);

    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
