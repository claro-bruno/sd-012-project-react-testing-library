import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('requisito 2- Testa componente About', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('página contem informações sobre pokedex', () => {
    userEvent.click(screen.getByText('About'));

    const txt = 'About Pokédex';
    const txt21 = 'This application simulates a Pokédex,';
    const txt22 = ' a digital encyclopedia containing all Pokémons';
    const txt31 = 'One can filter Pokémons by type,';
    const txt32 = ' and see more details for each one of them';
    const txt3 = txt31 + txt32;
    const txt2 = txt21 + txt22;
    const infoTxt = screen.getByRole('heading', { name: txt });
    const infoP1 = screen.getByText(txt2);
    const infoP2 = screen.getByText(txt3);

    expect(infoTxt).toBeInTheDocument();
    expect(infoP1).toBeInTheDocument();
    expect(infoP2).toBeInTheDocument();
  });

  it('página contem imagem de pokedex', () => {
    userEvent.click(screen.getByText('About'));

    const url1 = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/';
    const url2 = 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const url = url1 + url2;

    const img = screen.getByRole('img');

    expect(img.src).toBe(url);
  });
});
