import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('<About.js /> component testing', () => {
  it('Se a pág contém informações sobre a "Pokédex".', () => {
    render(<About />);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Se a pág contém um "heading h2" com o texto "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByText('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('About Pokédex');
  });

  it('Se a pág contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphs = querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('Se a pág contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const image = uerySelector('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
