import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

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

beforeEach(() => {
  renderWithRouter(<About />);
});

test('Verificando elementos do componente About', () => {
  const infos = [
    /This application simulates a Pokédex, a/i,
    /digital encyclopedia containing all Pokémons/i,
    /One can filter Pokémons by type, and see/i,
    /more details for each one of them/i];

  infos.forEach((string) => {
    const textPart = screen.getByText(string);
    expect(textPart).toBeInTheDocument();
    expect(textPart.localName).toBe('p');
  });
  const h2 = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(h2).toBeInTheDocument();
  expect(h2.localName).toBe('h2');
  const imagem = screen.getByRole('img');
  const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(imagem).toHaveProperty('src', URL);
});
