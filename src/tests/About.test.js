import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Atendendo aos testes do Requisito 2', () => {
  test('Testando Links do Requisito 1', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole('heading', { level: 2 });
    expect(aboutHeading).toBeInTheDocument();
    expect(aboutHeading.innerHTML).toBe('About Pokédex');

    const textP1 = 'This application simulates a Pokédex, a '
    + 'digital encyclopedia containing all Pokémons';
    const P1 = screen.getByText(textP1);
    expect(P1).toBeInTheDocument();
    expect(P1[Object.keys(P1)[0]].elementType).toBe('p');

    const textP2 = 'One can filter Pokémons by type, and see more details '
    + 'for each one of them';
    const P2 = screen.getByText(textP2);
    expect(P2).toBeInTheDocument();
    expect(P2[Object.keys(P2)[0]].elementType).toBe('p');

    const img = screen.getByRole('img');
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex'
    + '.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imgSrc);
  });
});
