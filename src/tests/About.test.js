import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Teste do componente About.js', () => {
  const { history } = renderWithRouter(<App />);
  const about = screen.getByRole('link', { name: /about/i });
  fireEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const heading = screen.getByRole('heading', { name: /About Pokédex/i });
  expect(heading).toBeInTheDocument();

  const img = screen.getByRole('img', { src: /Pokédex/i });
  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
