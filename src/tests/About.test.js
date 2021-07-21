import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica About.js', () => {
  test(
    'Testa se a página contém informações sobre a Pokédex com heading h2 About Pokédex.',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutPokedex = screen.getByText(/about/i);

      userEvent.click(aboutPokedex);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
      const headingText = screen.getByRole('heading', { name: /About Pokédex/i });
      expect(headingText.localName).toBe('h2');
    },
  );

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    const aboutPokedex = screen.getByText(/about/i);

    userEvent.click(aboutPokedex);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const paragrafo1 = `This application simulates a Pokédex,
      a digital encyclopedia containing all Pokémons`;
    const paragrafo2 = `One can filter Pokémons by type,
      and see more details for each one of them`;
    expect(aboutPokedex).toBeInTheDocument(paragrafo1 && paragrafo2);
  });

  test('Testa se a página contém a imagem de uma Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    const aboutPokedex = screen.getByText(/about/i);

    userEvent.click(aboutPokedex);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const imagem = screen.getByRole('img');
    expect(imagem).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
