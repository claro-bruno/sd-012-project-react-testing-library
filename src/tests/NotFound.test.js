import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
    history,
  });
};

test('Verifica heading h2 e imagem no componente NotFound', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const notFoundMsg = screen.getByText('Page requested not found');
  expect(notFoundMsg).toBeInTheDocument();
  expect(notFoundMsg.localName).toBe('h2');
  const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const img = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  expect(img).toHaveProperty('src', URL);
});
