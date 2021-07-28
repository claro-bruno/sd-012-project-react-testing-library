// import React from 'react';
// import { screen } from '@testing-library/react';
// import About from '../components/About';
// import renderWhithRouter from './renderWhithRouter.test';

// describe('Testando componente About', () => {
//   renderWhithRouter(<About />);

//   test('Teste se a página contém as informações sobre a Pokédex', () => {
//     const infPokedex = screen.getByRole('link', { name: /About/i });
//     expect(infPokedex).toBeInTheDocument();
//   });

//   test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
//     const title = screen.getByText('heading', { name: /About/i });
//     expect(title).toBeInTheDocument();
//   });

//   test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
//     const paragraph = screen.getByText('textBox', { name: /About/i });
//     expect(paragraph).toBeInTheDocument();
//   });

//   test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
//     const img = screen.getByRole('link', { name: /About/i });
//     expect(img).toBeInTheDocument();
//   });
// });
