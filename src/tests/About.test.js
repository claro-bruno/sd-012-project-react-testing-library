import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const phrase = 'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons';
    const paragraph = 'One can filter Pokémons by type,'
      + ' and see more details for each one of them';
    const infoList = screen.getAllByText(/Pokémons*/i);
    const listLength = 2;

    expect(infoList).toHaveLength(listLength);
    expect(infoList[0]).toHaveTextContent(phrase);
    expect(infoList[1]).toHaveTextContent(paragraph);
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const phrase = 'About Pokédex';
    const headerList = screen.getAllByRole('heading');
    const listLength = 1;

    expect(headerList).toHaveLength(listLength);
    expect(headerList[0]).toHaveTextContent(phrase);
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const infoList = screen.getAllByText(/Pokémons*/i);
    const listLength = 2;

    expect(infoList).toHaveLength(listLength);
    expect(infoList[0]).toBeInTheDocument();
    expect(infoList[1]).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem ', () => {
    renderWithRouter(<About />);
    const imageList = screen.getAllByRole('img');
    const listLength = 1;
    const imagePath = 'https://cdn2.bulbagarden.net/upload/'
      + 'thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imageList).toHaveLength(listLength);
    expect(imageList[0]).toBeInTheDocument();
    expect(imageList[0].src.toString()).toBe(imagePath);
  });
});
