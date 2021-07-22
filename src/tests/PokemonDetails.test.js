import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Atendendo aos testes do Requisito 7', () => {
  test('Testando requisitos', () => {
    renderWithRouter(<App />);
    const pkmName = screen.getByTestId('pokemon-name');
    expect(pkmName).toBeInTheDocument();

    let details = screen.getByText('More details');
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const detailHeader = screen.getByText(`${pkmName.textContent} Details`);
    expect(detailHeader).toBeInTheDocument();

    details = screen.queryByText('More details');
    expect(details).toBeNull();

    const secSummaryH = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(secSummaryH).toBeInTheDocument();

    const pkmInfo = screen.queryByText(/^.{50,}$/g);
    expect(pkmInfo).toBeInTheDocument();
    expect(pkmInfo.tagName).toBe('P');

    const pkmLocationH = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${pkmName.textContent}` });
    expect(pkmLocationH).toBeInTheDocument();

    const pkmMapImg = screen.getAllByAltText(`${pkmName.textContent} location`);
    expect(pkmMapImg.length).not.toBe(0);
    pkmMapImg.forEach((e) => {
      expect(e).toBeInTheDocument();
      expect(e.src).toContain('http');
    });
    const favLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favLabel).toBeInTheDocument();
    expect(favLabel.type).toBe('checkbox');
    expect(favLabel.id).toBe('favorite');
    expect(favLabel.checked).toBe(false);
    userEvent.click(favLabel);
    expect(favLabel.checked).toBe(true);
    userEvent.click(favLabel);
    expect(favLabel.checked).toBe(false);
  });
});
