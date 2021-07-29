import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do <PokemonDetails />', () => {
  test('Verifica se as informações do pokemon é renderizada', () => {
    renderWithRouter(<App />);
    const psyButton = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(psyButton);

    const linkMoreDetails = screen.getByText(/more details/i);
    userEvent.click(linkMoreDetails);

    const text = screen.getByRole('heading', { name: /Alakazam Details/i });
    expect(text).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /Summary/i });
    expect(heading).toBeInTheDocument();

    const phrase = screen.getByText(/Closing both its eyes heightens/i);
    expect(phrase).toBeInTheDocument();
  });

  test('Testa se existe mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/65');

    const imgTitle = screen.getByText(/Game Locations of Alakazam/i);
    expect(imgTitle).toBeInTheDocument();

    const img = screen.getAllByRole('img');
    expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
    expect(img[1].alt).toBe('Alakazam location');
  });

  test('Testa se o usuário pode favoritar através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const psyButton = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(psyButton);

    const linkMoreDetails = screen.getByText(/more details/i);
    userEvent.click(linkMoreDetails);

    const checkButton = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkButton);

    const imgText = screen.getByAltText('Alakazam is marked as favorite');
    const url = 'http://localhost/star-icon.svg';
    expect(imgText.src).toBe(url);
  });
});
