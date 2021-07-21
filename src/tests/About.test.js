import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import About from '../components/About';

describe('Testa o component About', () => {
  it('Verifica se contém infos da pokédex', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(history.location.pathname).toBe('/about');
  });

  it('Verifica se possui um heading com o texto correto', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(header).toBeDefined();
  });

  it('Verifica se contém dois paragrafos', () => {
    renderWithRouter(<About />);
    const firstOne = /This application simulates a Pokédex,/i;
    const firstTwo = / a digital encyclopedia containing all Pokémons/i;
    const secondOne = /One can filter Pokémons by type,/i;
    const secondTwo = / and see more details for each one of them/i;

    const firstPathOne = screen.getByText(firstOne);
    const firstPathTwo = screen.getByText(firstTwo);
    const secondPathOne = screen.getByText(secondOne);
    const secondPathTwo = screen.getByText(secondTwo);

    expect(firstPathOne).toBeInTheDocument();
    expect(firstPathTwo).toBeInTheDocument();
    expect(secondPathOne).toBeInTheDocument();
    expect(secondPathTwo).toBeInTheDocument();
  });

  it('Verifica se a pagina contem uma imagem', () => {
    renderWithRouter(<About />);
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', imgSrc);
  });
});
