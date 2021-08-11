import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('About component tests', () => {
  test('Check rendered components on the About page', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });
    userEvent.click(link);
    const title = screen.getByText(/About Pokédex/i);
    const textFirstP = 'This application simulates a Pokédex';
    const textSecondP = 'One can filter Pokémons by type';
    const image = screen.getByRole('img');
    const imgSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(title).toBeDefined();
    expect(textFirstP).toBeDefined();
    expect(textSecondP).toBeDefined();
    expect(image).toHaveAttribute('src', imgSource);
  });
});
