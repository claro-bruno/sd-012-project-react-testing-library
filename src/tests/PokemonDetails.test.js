import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

let history;

describe('Verificar todo o component pokemon', () => {
  beforeEach(() => {
    ({ history } = renderWithRouter(<App />));
  });

  it('Teste a tela de PokemonDetails', () => {
    userEvent.click(screen.getByText('More details'));
    
  });
  

});
