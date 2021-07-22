import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testando o component <PokemonDetails />', () => {
  const { name, summary, foundAt } = data[0];

  function goToComponent() {
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);
  }

  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it(('Testando se as infos do Pokémon são mostradas na tela corretamente'), () => {
    goToComponent();

    const headingName = screen.getByRole('heading', { name: `${name} Details` });
    expect(headingName).toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(headingSummary).toBeInTheDocument();

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });

  it(('Testando seção de mapas'), () => {
    goToComponent();

    const headingMap = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(headingMap).toBeInTheDocument();

    foundAt.forEach(({ location, map }) => {
      const locationText = screen.getByText(location);
      expect(locationText).toBeInTheDocument();

      const maps = screen.getAllByRole('img', { name: `${name} location` });
      const imageMap = maps.some(({ src }) => src === map);
      expect(imageMap).toBeTruthy();
    });
  });

  it(('Testando se é possível favoritar Pokémon por aqui'), () => {
    goToComponent();

    const checkBox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);
    const pokeStar = screen.getByRole('img', { name: /favorite/i });
    expect(pokeStar).toBeInTheDocument();
    userEvent.click(checkBox);
    expect(pokeStar).not.toBeInTheDocument();
  });
});
