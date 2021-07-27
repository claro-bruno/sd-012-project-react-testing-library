import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Teste dos componentes do <About.js/>', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const text = getByText(/This application simulates/);
    expect(text).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    const title = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = render(<About />);
    const paragraph = getAllByText(/s/);
    expect(paragraph.length).toEqual(2);
  });

  it('Teste se a página contém uma determinada imagem ', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
