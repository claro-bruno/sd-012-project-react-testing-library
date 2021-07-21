import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa links de navegação do componente App.js', () => {
  const { history } = renderWithRouter(<App />);
  const allLinks = screen.getAllByRole('link');
  const expectedLinks = ['Home', 'About', 'Favorite Pokémons'];
  const expectedURL = ['/', '/about', '/favorites'];

  expectedLinks.forEach((link, index) => {
    expect(link).toBe(allLinks[index].innerHTML);
    userEvent.click(allLinks[index]);
    const { pathname } = history.location;
    expect(pathname).toBe(expectedURL[index]);
  });

  history.push('/paginaestranha');
  expect(screen.getByText('Page requested not found')).toBeInTheDocument();
});
