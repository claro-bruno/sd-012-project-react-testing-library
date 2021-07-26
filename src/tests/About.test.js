import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe(' Testes do componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByRole } = render(<About />);
    const subtitle = screen.getByRole('heading', { level: 2 });
    expect(subtitle).toHaveTextContent(/About Pokédex/i);
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex..', () => {
    const { container } = render(<About />);
    const paragraphs = container.getByRole('p');
    expect(paragraphs.length).toBe(2);
  });

  it('Teste se a página contém a seguinte URL de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');

    expect(img.src).toContain(URL);
  });
});
