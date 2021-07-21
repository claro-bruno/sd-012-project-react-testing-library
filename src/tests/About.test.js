import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente <About />', () => {
  it('Testa se contem todos os items', () => {
    renderWithRouter(<About />);
    const t1 = () => ('This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons'
    );

    const heading = screen.getByText('About Pokédex');
    expect(heading).toBeInTheDocument();

    const paragrafo1 = screen
      .getByText(t1());
    expect(paragrafo1).toBeInTheDocument();

    const paragrafo2 = screen
      .getByText(
        'One can filter Pokémons by type, and see more details for each one of them',
      );
    expect(paragrafo2).toBeInTheDocument();

    const image = screen.getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
