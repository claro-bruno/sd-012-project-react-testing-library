import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa About', () => {
  test('Testa se há informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading');
    expect(aboutPokedex).toHaveTextContent('About Pokédex');
    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs).toHaveLength(2);
    const image = screen.getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
