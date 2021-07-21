import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}
describe('Testa o componente <NotFound.js />', () => {
  test('Testa se a pg contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const headingText = 'Page requested not found Crying emoji';
    const notFound = screen.getByRole('heading', { name: headingText });
    expect(notFound).toBeInTheDocument();
  });

  test('Testa se a página mostra uma imagem de Pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const altText = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(altText);
    const imageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toBe(imageSrc);
  });
});
