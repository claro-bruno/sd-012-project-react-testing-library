import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <App />', () => {
  it('Teste se Pokédex page é renderizada ao carregar a aplicação no caminho de URL `/`',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
    });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();

    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();

    const favorite = screen.getByText('Favorite Pokémons');
    expect(favorite).toBeInTheDocument();
  });

  it('Teste se a página é redirecionada ao início, ao clicar no link da Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTxt = screen.getByText(/Encountered pokémons/);
    expect(homeTxt).toBeInTheDocument();
  });

  it('Teste se a página é redirecionada ao About, na URL /about', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTxt = screen.getByText(/About Pokédex/);
    expect(aboutTxt).toBeInTheDocument();
  });

  it('Teste se a página é redirecionada aos favoritos, na URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favTxt = screen.getByText(/Favorite pokémons/);
    expect(favTxt).toBeInTheDocument();
  });

  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');

    const noMatch = screen.getByText(/Page requested not found/);
    expect(noMatch).toBeInTheDocument();
  });
});
