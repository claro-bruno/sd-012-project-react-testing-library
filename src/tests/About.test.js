import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa o componente About', () => {
  test('Verifica se o conteúdo da página é o esperado', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: 'About Pokédex' });
    const firstParagraph = 'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons';
    const secondParagraph = 'One can filter Pokémons by type,'
      + ' and see more details for each one of them';
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(title).toBeInTheDocument();
    expect(screen.getByText(firstParagraph)).toBeInTheDocument();
    expect(screen.getByText(secondParagraph)).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageUrl);
  });
});
