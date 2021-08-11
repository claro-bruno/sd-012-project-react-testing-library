import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto'
  + ' Page requested not found 😭;', () => {
    renderWithRouter(<NotFound />);
    const headingsList = screen.getAllByRole('heading');
    const headingText = 'Page requested not found 😭';
    const listLength = 1;

    expect(headingsList).toHaveLength(listLength);
    expect(headingsList[0]).toBeInTheDocument();
    expect(headingsList[0]).toHaveTextContent(headingText);
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imageList = screen.getAllByRole('img');
    const listLength = 2;
    const imagePath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imageList).toHaveLength(listLength);
    expect(imageList[1]).toBeInTheDocument();
    expect(imageList[1].src.toString()).toBe(imagePath);
  });
});
