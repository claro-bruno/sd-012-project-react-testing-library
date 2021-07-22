import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testes do component About', () => {
  test('Verifica os componentes renderizados na pagina About', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });
    userEvent.click(link);
    const title = screen.getByText(/About Pokédex/i); // busca em todos os titulos da pagina o titulo que possui o texto esperado
    expect(title).toBeDefined(); // verifica se o titulo deseja foi renderizado
    const textFirstP = 'This application simulates a Pokédex'; // const com o texto do primeiro paragrafo
    const textSecondP = 'One can filter Pokémons by type';// const com o texto do segundo paragrafo
    expect(textFirstP).toBeDefined(); // verifica se o texto foi renderizado
    expect(textSecondP).toBeDefined(); // verifica se o texto foi renderizado
    const image = screen.getByRole('img'); // captura o elemento que possui a tag img
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'; // path da imagem
    expect(image).toHaveAttribute('src', imgSrc); // verifica se o elemento img possui o atributo src com o valor correspondente ao path da img
  });
});
