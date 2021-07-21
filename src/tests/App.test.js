import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  it('Testa o texto e se existe os três links', () => {
    renderWithRouter(<App />);
    const Home = screen.getByText('Home');
    const About = screen.getByText('About');
    const Favs = screen.getByText('Favorite Pokémons');

    expect(Home).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(Favs).toBeInTheDocument();
  });

  it('Testa se o Home redireciona', () => {
    const { history } = renderWithRouter(<App />);
    const Home = screen.getByText('Home');

    userEvent.click(Home);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Testa se o About redireciona', () => {
    const { history } = renderWithRouter(<App />);
    const About = screen.getByText('About');

    userEvent.click(About);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Testa se o Favoritos redireciona', () => {
    const { history } = renderWithRouter(<App />);
    const Favs = screen.getByText('Favorite Pokémons');

    userEvent.click(Favs);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
    expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
  });

  it('Testa se o NotFound rederiza em uma URL desconhecida. ', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/aaaa');
    const pathName = history.location.pathname;
    expect(pathName).toBe('/aaaa');
    expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
      .toBeInTheDocument();
  });
});
