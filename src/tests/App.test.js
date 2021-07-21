import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  it('Testa existência dos links', async () => {
    const home = await screen.findByRole('link', /home/i);
    const about = await screen.findByRole('link', /about/i);
    const fav = await screen.findByRole('link', /favorite pokémons/i);

    await waitFor(() => {
      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(fav).toBeInTheDocument();
    });
  });

  it('Testa funcionamento do link home', async () => {
    const { history } = renderWithRouter(<App />);
    const home = await screen.findByRole('link', /home/i);

    fireEvent.click(home);

    const { pathname } = history.location;
    const homeText = await screen.findByText(/Encountered pokémons/i);

    await waitFor(() => {
      expect(pathname).toBe('/');
      expect(homeText).toBeInTheDocument();
    });
  });

  it('Testa funcionamento do link about', async () => {
    const { history } = renderWithRouter(<App />);
    const about = await screen.findByRole('link', /about/i);
    const { pathname } = history.location;

    fireEvent.click(about);

    const aboutText = await screen.findByText(/About Pokédex/i);

    await waitFor(() => {
      expect(pathname).toBe('/about');
      expect(aboutText).toBeInTheDocument();
    });
  });

  it('Testa funcionamento do link Favorite Pokémons', async () => {
    const { history } = renderWithRouter(<App />);
    const fav = await screen.findByRole('link', /favorite pokémons/i);
    const { pathname } = history.location;

    fireEvent.click(fav);

    const favText = await screen.findByText(/Favorite pokémons/i);

    await waitFor(() => {
      expect(pathname).toBe('/favorites');
      expect(favText).toBeInTheDocument();
    });
  });

  it('Testa aviso de página inexistente', async () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    const notFound = '/notFound';
    const noMatch = await screen.findByText(/Page requested not found/i);

    history.push(notFound);

    await waitFor(() => {
      expect(pathname).toBe(notFound);
      expect(noMatch).toBeInTheDocument();
    });
  });
});
