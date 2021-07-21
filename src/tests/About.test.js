import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando se o About.js', () => {
  it('contém h2 com texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('contém 02 parágrafos com textos sobre a pokedex', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const P_ONE_CONTENT = 'This application simulates a Pokédex';

    const paragraphOne = screen.getByText(P_ONE_CONTENT, { exact: false });
    expect(paragraphOne).toBeInTheDocument();

    const P_TWO_CONTENT = 'One can filter Pokémons by type,';

    const paragraphTwo = screen.getByText(P_TWO_CONTENT, { exact: false });
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('contém a imagem certa de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringMatching('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'));
  });
});
