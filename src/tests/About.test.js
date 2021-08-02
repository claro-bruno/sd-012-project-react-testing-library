import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

describe('Testing About Component, Requirement 2', () => {
  it('there is a level 2 heading with the "About Pokédex" text in the document',
    () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>,
      );

      expect(screen.getByRole('heading', {
        level: 2,
        name: 'About Pokédex',
      }))
        .toBeInTheDocument();
    });

  it('the first and second paragraph are about Pokédex',
    () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>,
      );
      const firstParagraph = screen.getAllByText(/Pokémons/)[0];
      const secondParagraph = screen.getAllByText(/Pokémons/)[1];

      expect(firstParagraph).toBeInTheDocument();
      expect(secondParagraph).toBeInTheDocument();
    });

  it('the image have the appropriate source and Alt',
    () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>,
      );

      expect(screen.getByRole('img', {
        name: 'Pokédex',
      }))
        .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
