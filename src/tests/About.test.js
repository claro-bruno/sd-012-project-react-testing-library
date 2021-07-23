import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste do componente About', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Contém um heading h2 com o texto About Pokédex.', () => {
    expect(screen
      .getByRole('heading', { level: 2, name: 'About Pokédex' }))
      .toBeInTheDocument();
  });

  test('Contém dois parágrafos com texto sobre a Pokédex', () => {
    expect(screen
      .getByText(/This application/i));
    expect(screen
      .getByText(/One can filter/i));
  });

  test('Contém a imagem de uma Pokédex', () => {
    // Feito com ajuda de Nuwanda turma 12
    // expect(screen
    //   .getByRole('img'))
    //   .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    // Feito com ajuda de Daniel Batista - turma 12
    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText('Pokédex');
    expect(img.src).toBe(link);
  });
});
