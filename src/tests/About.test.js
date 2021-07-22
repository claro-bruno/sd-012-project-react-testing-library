import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testa componente About', () => {
  test('testa info sobre Pokédex na página', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');

    expect(screen.getByRole('heading', { name: 'About Pokédex' }))
      .toBeInTheDocument();

    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getAllByText('Pokédex');
    expect(img.src).toBe(link);

    expect(screen.getByText(/This application/i));
    expect(screen.getByText(/One can filter/i));
  });
});
