import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

function Filter(nameP) {
  renderWithRouter(<App />);
  const button = screen.getAllByTestId('pokemon-type-button');
  const btn = screen.getByRole('button', { name: nameP });
  fireEvent.click(btn);
  const pokemon = screen.getByTestId('pokemon-name');
  const type = screen.getByTestId('pokemon-type');
  return ({
    button,
    btn,
    pokemon,
    type,
  });
}

export default Filter;
