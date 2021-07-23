import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Testa o componente <About.js />.', () => {
  test('Testa se a imagem do Pokémon é exibida', () => {
    renderWithRouter(<App />);
    const image = screen.getByAltText(`${data[0].name} sprite`);
    expect(image.src).toBe(data[0].image)
  });

});
