import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Check if NotFound.js is working as it should', () => {
  beforeEach(() => {
    renderWithRouter(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
  });

  afterEach(cleanup);

  it('Check if there is a heading h2 with text "Page requested not found 😭"', () => {
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Page requested not found 😭');
    expect(title.tagName).toBe('H2');
  });
  it('Check if the NotFound.js page has the correct image', () => {
    const imgPath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const everyImg = screen.getAllByRole('img');
    const correctImg = everyImg.find((img) => img.src === imgPath);
    expect(correctImg).toBeInTheDocument();
    const rightImg = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(rightImg.src).toBe(imgPath);
  });
});
