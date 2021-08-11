import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import historyRender from './GenericHistory';

describe('Testes do componente Pokemon.js', () => {
  test('testa se o nome correto do pokemon é mostrado na tela', () => {
    historyRender(<App />);
    const name = screen.getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
  });

  test('testa se o tipo do pokemon é mostrado na tela', () => {
    historyRender(<App />);
    const poketype = screen.getAllByText(/Electric/i);
    expect(poketype).toHaveLength(2);
  });

  test('testa se a imagem do pokemon é exibida', () => {
    historyRender(<App />);
    const pokeimage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokeimage.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('testa se exibe o peso médio do pokemon', () => {
    historyRender(<App />);
    const measurement = screen.getByText('Average weight: 6.0 kg');
    expect(measurement).toBeInTheDocument();
  });

  test('testa link para detalhes', () => {
    const { history } = historyRender(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
