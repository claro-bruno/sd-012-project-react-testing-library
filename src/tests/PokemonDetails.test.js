import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const mdName = 'More details';
const bfEachFunc = () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('button', { name: 'Electric' }));
  userEvent.click(screen.getByRole('link', { name: mdName }));
};

describe('requisito 7- informacoes detalhadas aparecem', () => {
  beforeEach(bfEachFunc);

  it('contem nome do pokemon', () => {
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.innerHTML).toBe('Pikachu');
  });

  it('Não deve existir o link para detalhes do pokemon', () => {
    const MdLinks = screen.getAllByRole('link');
    const MdLinksFilter = MdLinks.filter((e) => e.innerHTML === mdName);
    expect(MdLinksFilter.length).toBe(0);
  });

  it('deve conter heading Summary', () => {
    const hdSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(hdSummary).toBeInTheDocument();
  });

  it('deve conter paragrafo de detalhes', () => {
    const pikachuSummary1 = 'This intelligent Pokémon roasts hard berries with';
    const pikachuSummary2 = ' electricity to make them tender enough to eat.';
    const pikachuSummary = pikachuSummary1 + pikachuSummary2;
    const details = screen.getByText(pikachuSummary);
    expect(details).toBeInTheDocument();
  });
});

describe('requisito 7- testa mapas', () => {
  beforeEach(bfEachFunc);

  it('existe heading Game location of...', () => {
    const location = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(location).toBeInTheDocument();
  });

  it('todos nomes de localisacoes sao mostrados', () => {
    const loc1 = screen.getByText('Kanto Viridian Forest');
    expect(loc1).toBeInTheDocument();
    const loc2 = screen.getByText('Kanto Power Plant');
    expect(loc2).toBeInTheDocument();
  });

  it('todas imagens de localisacao sao mostradas', () => {
    const images = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(images.length).toBe(2);
    const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(images[0].src).toBe(url1);
    expect(images[1].src).toBe(url2);
  });
});

describe('requisito 7- testa favoritar', () => {
  beforeEach(bfEachFunc);

  it('exibe checkbox de favoritar', () => {
    const favCheck = screen.getByRole('checkbox');
    expect(favCheck).toBeInTheDocument();
  });

  it('clicks adicionam e removem pokemon da lista de favoritos', () => {
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));

    const starImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starImg).toBeInTheDocument();

    const imgList = screen.getAllByRole('img');
    const expLength1 = 4;
    expect(imgList.length).toBe(expLength1);

    userEvent.click(screen.getByRole('checkbox'));

    const imgList2 = screen.getAllByRole('img');
    const expLength2 = 3;
    const filterFav = imgList2.filter((e) => e.alt === 'Pikachu is marked as favorite');
    expect(filterFav.length).toBe(0);
    expect(imgList2.length).toBe(expLength2);
  });
});
