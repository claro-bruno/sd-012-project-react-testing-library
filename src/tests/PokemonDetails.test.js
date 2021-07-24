import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica PokemonDetails.js', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/More details/i);
    userEvent.click(moreDetailsLink);

    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const nameDetails = screen.getByText(/Pikachu Details/i);
    expect(nameDetails).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(moreDetailsLink).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const summaryText = screen.getByRole('heading',
      { name: /Summary/i });
    expect(summaryText.localName).toBe('h2');
    expect(summaryText).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const pokemonAboutParagrapher = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(pokemonAboutParagrapher.localName).toBe('p');
    expect(pokemonAboutParagrapher).toBeInTheDocument();
  });

  test('Testa se existe uma seção com mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/More details/i);
    userEvent.click(moreDetailsLink);

    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const locationsText = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i });
    expect(locationsText.localName).toBe('h2');
    expect(locationsText).toBeInTheDocument();

    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    const imgLocation = screen.getAllByRole('img', { name: 'Pikachu location' });
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    expect(imgLocation.length).toBe(2);

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const locationName = screen.getByText(/Kanto Viridian Forest/i, /Kanto Power Plant/i);
    expect(locationName).toBeInTheDocument();

    // A imagem da localização deve ter um atributo src com a URL da localização;
    expect(imgLocation[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocation[0]).toBeInTheDocument();

    expect(imgLocation[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgLocation[1]).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/More details/i);
    userEvent.click(moreDetailsLink);

    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const checkFavorite = screen.getByRole('checkbox');
    expect(checkFavorite).toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    const imgStar = screen.queryByAltText(/Pikachu is marked as favorite/i);
    expect(imgStar).not.toBeInTheDocument();
    userEvent.click((checkFavorite), () => {
      expect(imgStar).toBeInTheDocument();
    });

    // O label do checkbox deve conter o texto Pokémon favoritado?;
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();
  });
});
