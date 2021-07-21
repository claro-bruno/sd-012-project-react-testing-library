import React from 'react';
import About from '../components/About';
import { render, screen } from '@testing-library/react';

describe("Tests for about component.", () => {
  it("Test if about has a h2, two paragraphs and the correct img.", () => {
    render(<About />);
    const aboutHeading = screen.getByRole(/heading/i, { name: /about pokédex/i });
    const p1 = "This application simulates a Pokédex, a digital encyclopedia containing all Pokémons";
    const p2 = "One can filter Pokémons by type, and see more details for each one of them";
    const aboutParagraph1 = screen.getByText(p1);
    const aboutParagraph2 = screen.getByText(p2);
    const aboutImg = screen.getByRole(/img/i);
    const correctImgPath = "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png";

    expect(aboutImg).toHaveProperty("src", correctImgPath);
    expect(aboutHeading).toBeDefined();
    expect(aboutParagraph1).toBeDefined();
    expect(aboutParagraph2).toBeDefined();
  });
});