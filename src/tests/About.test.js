import React from 'react';
import { screen, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';

describe('Testa componente About', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Verifica se o componente renderiza um heading com o texto correto', () => {
    const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

    expect(title).toBeInTheDocument();
  });
  test('Verifica se dois parágrafos foram renderizados', () => {
    const textP1 = /This application simulates a Pokédex/i;
    const paragraph1 = screen.getByText(textP1);
    expect(paragraph1).toBeDefined();

    const textP2 = /One can filter Pokémons by type/i;
    const paragraph2 = screen.getByText(textP2);
    expect(paragraph2).toBeDefined();
  });
  test('Verifica se a URL da imagem renderizada está correta', () => {
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', imgURL);
  });
});
