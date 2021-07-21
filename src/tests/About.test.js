import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../help/renderWithRouter';
import { About } from '../components';

describe('Teste componente About', () => {
  it('Test contains information about Pokédex', () => {
    renderWithRouter(<About />);

    const $subTitleAbout = screen
      .getByRole('heading', { name: /About Pokédex/i });
    expect($subTitleAbout).toBeInTheDocument('');
  });

  it('Test to see if you have two paragraphs and the Pokédex text', () => {
    renderWithRouter(<About />);

    const $fistParagrafh = screen
      .getByText(/This application simulates a Pokédex/i);
    expect($fistParagrafh).toBeInTheDocument('');

    const $secondParagrafh = screen
      .getByText(/ne can filter Pokémons by type/i);
    expect($secondParagrafh).toBeInTheDocument('');
  });

  it('Test if the page contains the following image of a Pokédex', () => {
    renderWithRouter(<About />);

    const $imgHtml = screen.getByRole('img');
    expect($imgHtml).toBeInTheDocument();

    const IMG_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect($imgHtml.src).toBe(IMG_URL);
  });
});
