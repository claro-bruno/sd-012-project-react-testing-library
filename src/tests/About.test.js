import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2- Test component <About.js />', () => {
  it('2.1 - Test if has a <h2> tag with the message "About Pokédex"', () => {
    renderWithRouter(<About />);
    const h2Tag = screen.getByRole('heading', { level: 2 });
    const h2Text = screen.getByText('About Pokédex');
    expect(h2Tag).toBeInTheDocument();
    expect(h2Text).toBeInTheDocument();
  });
  it('2.2 - Test if exist two <p> tags containing text about pokédex', () => {
    renderWithRouter(<About />);
    const pTag = screen.getAllByText(/pokémons/i);
    expect(pTag).toHaveLength(2);
  });
  it('2.3 - Test if exist an image containing a Pokédex', () => {
    renderWithRouter(<About />);
    const IMAGE_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageTag = screen.getByRole('img');
    expect(imageTag).toHaveProperty('src', IMAGE_URL);
  });
});
