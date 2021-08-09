import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa Componente PokemonDetails', () => {
  describe('Informações detalhadas para o Pokémon selecionado mostrados na tela',
    () => {
      const MoreDetails = 'More details';
      it('Link mais detalhes no componente do aplicativo', () => {
        renderWithRouter(<App />);

        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        expect(MoreDetailsLink).toBeInTheDocument();
      });

      it('Usuário é redirecionado para a tela de detalhes do Pokémons', () => {
        const { history } = renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        expect(MoreDetailsLink).toBeInTheDocument();

        userEvent.click(MoreDetailsLink);

        const { pathname } = history.location;

        expect(pathname).toBe('/pokemons/25');
      });

      it('Informações detalhadas do Pokémon são mostradas na tela', () => {
        const { history } = renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        expect(MoreDetailsLink).toBeInTheDocument();

        userEvent.click(MoreDetailsLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/pokemons/25');

        expect(screen.getByRole('heading', {
          level: 2,
          name: 'Pikachu Details',
        })).toBeInTheDocument();

        expect(MoreDetailsLink).not.toBeInTheDocument();

        expect(screen.getByRole('heading', {
          level: 2,
          name: 'Summary',
        }));

        expect(screen.getByText(/This intelligent Pokémon/));
      });
    });
  describe('Maps contendo as localizações do pokémon',
    () => {
      const MoreDetails = 'More details';
      it('Ter um h2 com o texto correto e um maps de imagem', () => {
        renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        userEvent.click(MoreDetailsLink);

        expect(screen.getByRole('heading', {
          level: 2,
          name: 'Game Locations of Pikachu',
        }));

        expect(screen.getAllByRole('img', {
          name: 'Pikachu location',
        })[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

        expect(screen.getAllByRole('img', {
          name: 'Pikachu location',
        })[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      });

      it('Testa o checkbox', () => {
        renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        userEvent.click(MoreDetailsLink);

        const checkboxFromRole = screen.getByRole('checkbox', {
          name: 'Pokémon favoritado?',
        });

        const checkboxFromLabel = screen.getByLabelText('Pokémon favoritado?');

        expect(checkboxFromRole).toBe(checkboxFromLabel);
        expect(checkboxFromRole).toBeInTheDocument();
      });
    });
});
