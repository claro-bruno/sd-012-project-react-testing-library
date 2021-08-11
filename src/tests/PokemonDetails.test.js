import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa a página de detalhes do Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsLink);
  });

  it('testa se as inforamções detalhadas são exibidas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
