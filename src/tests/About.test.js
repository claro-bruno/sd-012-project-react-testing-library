import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import { screen } from '@testing-library/react';

describe('testa o component "About" e seus elementos', () => {
  beforeEach(()=> {
    render(<About/>);
  })

  test('verifica a existencia de <h2> about pokédex', ()=> {
    const findH2 = screen.getByRole('heading', { level: 2});
    expect(findH2).toHaveTextContent(/About Pokédex/i);
  });

  test('verifica a existencia  da  pokedex info ', () => {
    const infoPokedex = screen.getByText(/This application simulates/i);
    const infoPokedex2 = screen.getByText(/One can filter/i)
    expect(infoPokedex).toBeInTheDocument();
    expect(infoPokedex2).toBeInTheDocument();
  });

test('verifica a existencia da imagem o src desejado', () => {
  const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    const img = screen.getByAltText(/Pokédex/i);
    expect(img.src).toBe(link)
  })
});
