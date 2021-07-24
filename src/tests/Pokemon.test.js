import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Testa o componente <About.js />.', () => {
  test('Testa se a imagem do Pokémon é exibida', () => {
    renderWithRouter(<App />);
    const image = screen.getByAltText(`${data[0].name} sprite`);
    expect(image.src).toBe(data[0].image);
  });
  test('Testa se a imagem do Pokémon é exibida', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    fireEvent.click(moreDetails);
    const check = screen.getByRole('checkbox');
    fireEvent.click(check);
    const star = screen.getByAltText(`${data[0].name} is marked as favorite`);
    expect(star.src).toContain('/star-icon.svg');
  });
});
