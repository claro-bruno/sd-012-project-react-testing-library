import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  beforeEach(() => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });

    fireEvent.click(aboutLink);
  });
  it('Renderiza título', () => {
    const aboutTitle = screen.getByText(/About Pokédex/i);

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Renderiza paragrafos', () => {
    const aboutParagraph1 = screen.getByText(/This application simulates a Pokédex/i);

    const aboutParagraph2 = screen.getByText(/One can filter Pokémons by type, /i);

    expect(aboutParagraph1).toBeInTheDocument();
    expect(aboutParagraph2).toBeInTheDocument();
  });

  it('Renderiza dois parágrafos', () => {
    const paragraphs = screen.queryAllByText(
      /Pokémons/i,
      { selector: 'p' },
      { exact: false },
    );

    expect(paragraphs).toHaveLength(2);
  });

  it('Renderiza a imagem', () => {
    const image = screen.getByAltText('Pokédex');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
