import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testando a página de About', () => {
  it('Testa se há um texto específico', () => {
    render(<About />);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Testa se há dois parágrafos descrevendo o Pokédex', () => {
    render(<About />);
    expect(screen.getAllByText(/Pokémons/i).length).toEqual(2);
  });

  it('Testa se há uma imagem com src path específico', () => {
    render(<About />);
    expect(screen.getByRole('img').src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
