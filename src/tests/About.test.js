import React from 'react';
import { screen, render } from '@testing-library/react';

import About from '../components/About';

test('Página contém as infos sobre a Pokédex', () => {
  render(<About />);

  const aboutText = screen.getByText('About Pokédex');
  expect(aboutText).toBeInTheDocument();

  const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
  expect(paragraph1).toBeInTheDocument();
  const paragraph2 = screen.getByText(/One can filter pokémons by type/i);
  expect(paragraph2).toBeInTheDocument();

  const imgElement = screen.getByAltText('Pokédex');
  expect(imgElement.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
