import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderRouter from './renderRouter';
import App from '../App';

describe('Teste dos componentes do <App.js/>', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página principal da Pokédex é renderizada no caminho de URL', () => {
    const { history } = renderRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getAllByRole } = renderRouter(<App />);
    const link = getAllByRole('link');
    expect(link[0].innerHTML).toBe('Home');
    expect(link[1].innerHTML).toBe('About');
    expect(link[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('A aplicação redireciona para a página inicial, na URL /  ao clicar em Home', () => {
    const { history, getByRole } = renderRouter(<App />);
    const home = getByRole('link', { name: 'Home' });
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('A aplicação redireciona para a página About, na URL /  ao clicar em About', () => {
    const { history, getByRole } = renderRouter(<App />);
    const about = getByRole('link', { name: 'About' });
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Redireciona para Pokémons Favoritados, na URL /  ao clicar em favorites', () => {
    const { history, getByRole } = renderRouter(<App />);
    const favorites = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Redireciona para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history, getByText } = renderRouter(<App />);
    history.push('*');
    const text = getByText(/not found/);
    expect(text).toBeInTheDocument();
  });
});
