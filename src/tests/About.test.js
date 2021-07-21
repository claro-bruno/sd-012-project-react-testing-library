import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste do componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');

    expect(screen
      .getByRole('heading', { name: 'About Pokédex' }))
      .toBeInTheDocument();

    // Feito com ajuda de Nuwanda turma 12
    // expect(screen
    //   .getByRole('img'))
    //   .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    // Feito com ajuda de Daniel Batista - turma 12
    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText('Pokédex');
    expect(img.src).toBe(link);

    expect(screen
      .getByText(/This application/i));
    expect(screen
      .getByText(/One can filter/i));
  });
});
