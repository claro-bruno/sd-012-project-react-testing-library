import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test the router links in the App page', () => {
  it('Test link names', () => {
    const { history } = renderWithRouter(<App />);

    const $linkHome = screen.getByText(/Home/i);
    expect($linkHome).toBeInTheDocument('');

    const $linkAbout = screen.getByText(/About/i);
    expect($linkAbout).toBeInTheDocument('');

    const $linkFavoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect($linkFavoritePokemons).toBeInTheDocument('');

    userEvent.click($linkHome);
    expect(history.location.pathname).toBe('/');

    userEvent.click($linkAbout);
    expect(history.location.pathname).toBe('/about');

    userEvent.click($linkFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/notIsAPage');
    const notFoundTxt = screen.getByText(/Page requested not found/i);
    expect(notFoundTxt).toBeInTheDocument();
  });
});
