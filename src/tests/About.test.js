import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

// import BrowserRouter from 'react-router-dom';
// import userEvent from '@testing-library/user-event';

describe('Verifica About.test.js', () => {
  test('Verifica se h2', () => {
    renderWithRouter(<About />);

    const AboutH2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(AboutH2).toBeDefined();
    const imgAbout = screen.getByRole('img');
    expect(imgAbout.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
