import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o about', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const getHome = screen.getByRole('link', { name: 'About' });
    expect(getHome).toBeInTheDocument();

    userEvent.click(getHome);
    const url = history.location.pathname;
    expect(url).toBe('/about');

    const info1Heper = 'a digital encyclopedia containing all Pokémons';
    const info2Heper = 'and see more details for each one of them';
    const info1 = screen.getByText(`This application simulates a Pokédex, ${info1Heper}`);
    const info2 = screen.getByText(`One can filter Pokémons by type, ${info2Heper}`);
    // const info2 = screen.getByText('a digital encyclopedia containing all Pokémons');
    expect(info1).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    const getHome = screen.getByRole('link', { name: 'About' });
    expect(getHome).toBeInTheDocument();

    userEvent.click(getHome);
    const url = history.location.pathname;
    expect(url).toBe('/about');

    const getH2 = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(getH2).toBeInTheDocument();

    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
