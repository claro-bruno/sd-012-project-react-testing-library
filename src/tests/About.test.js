import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente About', () => {
  test('Testa existência dos elementos renderizados no componente about', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutSubtitle = screen.getByRole('heading', { name: 'About Pokédex' });
    const aboutParagraph1 = screen.getByText('This application', { exact: false });
    const aboutParagraph2 = screen.getByText('Pokémons by type', { exact: false });
    const aboutImage = screen.getByRole('img', { name: 'Pokédex' });
    expect(aboutSubtitle).toBeInTheDocument();
    expect(aboutParagraph1).toBeInTheDocument();
    expect(aboutParagraph2).toBeInTheDocument();
    expect(aboutImage.src)
      .toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
