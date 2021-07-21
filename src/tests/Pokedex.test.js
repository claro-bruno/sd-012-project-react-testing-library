import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('h2 com o texto Encountered pokémons.', () => {
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    const getText = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(getText).toBeInTheDocument();
    expect(screen.queryByText(data[0].name)).toBeInTheDocument();
    userEvent.click(getText);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(getText);
    expect(screen.queryByText(data[2].name)).toBeInTheDocument(); // - Lógica de queryByText retirada do repositório do colega: https://github.com/eric-kreis
    userEvent.click(getText);
    expect(screen.queryByText(data[3].name)).toBeInTheDocument();
    userEvent.click(getText);
    expect(screen.queryByText(data[4].name)).toBeInTheDocument();
    userEvent.click(getText);
    expect(screen.queryByText(data[5].name)).toBeInTheDocument();
    userEvent.click(getText);
    expect(screen.queryByText(data[6].name)).toBeInTheDocument();
    userEvent.click(getText);
    expect(screen.queryByText(data[7].name)).toBeInTheDocument();
    userEvent.click(getText);
    expect(screen.queryByText(data[8].name)).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const oneAtTheTime = screen.getAllByTestId('pokemon-name');
    expect(oneAtTheTime.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const length = 7;
    const getBtnTestId = screen.getAllByTestId('pokemon-type-button');
    expect(getBtnTestId.length).toBe(length);
    screen.getAllByTestId('pokemon-type-button')
      .forEach((poke) => {
        userEvent.click(poke);
        expect(screen.getAllByTestId('pokemon-type').innerText)
          .toBe(poke.innerText);
      });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    userEvent.click(screen.getByText('Fire'));
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Fire');
    userEvent.click(screen.getByRole('button', { name: /All/i }));
    const oneAtTheTime = screen.getAllByTestId('pokemon-name');
    expect(oneAtTheTime.length).toBe(1);
  });
});
