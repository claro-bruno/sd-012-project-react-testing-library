import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente <App.js />', () => {
  it('Testa se a aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const homeText = screen.getByText(/Home/i);
    const aboutText = screen.getByText(/about/i);
    const favoritePokemonsText = screen.getByText(/favorite pokémons/i);

    expect(homeText).toBeInTheDocument();
    expect(aboutText).toBeInTheDocument();
    expect(favoritePokemonsText).toBeInTheDocument();
  });
});
