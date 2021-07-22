import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Testa se a aplicação contém um conjunto de links com navegação válida', () => {
    const { history } = renderWithRouter(<App />);

    // const codigoOriginal  = screen.getByRole('link', { name: DAVID GONZAGA })
    // expect(codigoOriginal).toBeInTheDocument();

    // fireEvent.click(codigoOriginal);
    // expect(history.location.path).toBe('/https://github.com/tryber/sd-012-project-react-testing-library/pull/38/commits/2915d87cbb1fbba5dfb810c01908f0fc4dcff95f')

    const home = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');

    const about = screen.getByRole('link', { name: 'About' });
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/not-found');
    expect(screen.getByAltText(/Pikachu crying/i)).toBeInTheDocument();
  });
});
