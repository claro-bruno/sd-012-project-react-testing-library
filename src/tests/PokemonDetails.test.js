import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { PokemonDetails } from '../components';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const POKEMON_TEST = pokemons[0];

const match = {
  params: { id: POKEMON_TEST.id },
};

const renderPokemonDetails = () => {
  beforeEach(() => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById = jest.fn() }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ jest.fn() }
      />,
    );
  });
};

describe('Teste se as informações detalhadas do '
+ 'Pokémon selecionado são mostradas na tela.',
() => {
  renderPokemonDetails();

  test('A página deve conter um texto <name> Details,'
  + ' onde <name> é o nome do Pokémon',
  () => {
    const title = screen.getByText(`${POKEMON_TEST.name} Details`);
    expect(title).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
    () => {
      // const linkToMoreDetails = screen.getByText('More details');
      // expect(linkToMoreDetails).toBeUndefined();
    });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary.',
    () => {
      const summary = screen.getByText('Summary');
      expect(summary).toBeInTheDocument();
    });

  test('A seção de detalhes deve conter um parágrafo com '
  + 'o resumo do Pokémon específico sendo visualizado.',
  () => {
    const pokemonDescription = screen.getByText(POKEMON_TEST.summary);
    expect(pokemonDescription).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com '
+ 'os mapas contendo as localizações do pokémon',
() => {
  renderPokemonDetails();

  test('Na seção de detalhes deverá existir um heading h2 com o texto '
  + 'Game Locations of <name>, onde <name> é o nome do Pokémon exibido.',
  () => {
    const titleLocations = screen
      .getByRole('heading', { name: `Game Locations of ${POKEMON_TEST.name}` });
    expect(titleLocations).toBeInTheDocument();
  });

  test('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes',
    () => {
      const locationsQuantity = POKEMON_TEST.foundAt.length;
      expect(screen.getAllByRole('img', { name: `${POKEMON_TEST.name} location` }))
        .toHaveLength(locationsQuantity);
    });

  test('Devem ser exibidos, o nome da localização e uma imagem do mapa '
  + 'em cada localização',
  () => {
    const locations = POKEMON_TEST.foundAt;
    locations.forEach((location, index) => {
      expect(screen.getByText(location.location)).toBeInTheDocument();
      expect(screen.getAllByRole('img')[index]).toBeInTheDocument();
    });
  });

  test('A imagem da localização deve ter um atributo src com a URL da localização',
    () => {
      const locations = POKEMON_TEST.foundAt;
      const pageLocationsImages = screen
        .getAllByRole('img', { name: `${POKEMON_TEST.name} location` });
      locations.forEach((location, index) => {
        expect(pageLocationsImages[index]).toHaveAttribute('src', location.map);
      });
    });

  test('A imagem da localização deve ter um atributo alt com o texto '
  + '<name> location, onde <name> é o nome do Pokémon', () => {
    const pageLocationsImages = screen
      .getAllByRole('img', { name: `${POKEMON_TEST.name} location` });
    pageLocationsImages.forEach((locationInPage) => {
      expect(locationInPage).toBeInTheDocument();
    });
  });
});

describe('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
  () => {
    renderPokemonDetails();

    test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    test('Cliques alternados no checkbox devem adicionar e '
    + 'remover respectivamente o Pokémon da lista de favoritos', () => {
      const checkbox = screen.getByText('Pokémon favoritado?');
      fireEvent.click(checkbox);
      expect(screen.getByRole('checkbox')).toBeChecked();
      fireEvent.click(checkbox);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    test('O label do checkbox deve conter o texto "Pokémon favoritado?"', () => {
      const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
      expect(labelCheckbox).toBeInTheDocument();
    });
  });
