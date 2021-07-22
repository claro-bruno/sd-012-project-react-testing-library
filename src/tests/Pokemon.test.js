import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('testando a pagina inicial', () => {
  it('Testa se o card renderiza para cada um', () => {
    renderWithRouter(<App />);
    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);
    const name = screen.getByText(/snorlax/i);
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByText(/Average weight: 460.0 kg/i);
    const image = screen.getByRole('img');
    expect(name).toBeInTheDocument();
    expect(type.innerHTML).toBe('Normal');
    expect(weight).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
    expect(image.alt).toContain('Snorlax sprite');
    expect(type.innerHTML).toBe('Normal');
  });
  it('testa o link dos detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const URL = '/pokemons/143';
    expect(history.location.pathname).toBe(URL);
  });
  it('teste da estrela de favorito', () => {
    renderWithRouter(<App />);
    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    const image = screen.getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toContain('Snorlax is marked as favorite');
  });
});
