import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(' Testes do componente APP - Ex1', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('A pagina deve possuir os links para  Home, About e Favorite Pokémons.', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('Clicar no link Home a aplicação vai para a página inicial ', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText(/home/i);
    fireEvent.click(home);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Clicar no link About a aplicação vai para a página About ', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    fireEvent.click(about);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it(' Se um link desconhecido leva para a página not found ', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/notfound');

    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
