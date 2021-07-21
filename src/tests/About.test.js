import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Test all About component', () => {
  test('if renders `About` component with Heading `About Pokédex`', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  test('if `About` component contains 2 paragraphs about the application', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(
      'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons',
    );
    const secondParagraph = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    expect(firstParagraph.tagName).toBe('P');
    expect(firstParagraph.textContent).not.toBeNull();
    expect(secondParagraph.tagName).toBe('P');
    expect(secondParagraph.textContent).not.toBeNull();
  });

  test('if `About` component contain a Pokédex image', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
