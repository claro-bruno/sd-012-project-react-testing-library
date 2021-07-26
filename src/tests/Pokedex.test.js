import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../renderWithRouter';
import data from '../data';

const pokemonType = 'pokemon-type';
const pokemonTypeBtn = 'pokemon-type-button';

describe('Teste o componente <Pokedex.js />', () => {
    it('Teste se a Página contém um heading h2 com o texto Encoutered pokémons.', () => {
        const { getByRole } = RenderWithRouter(<App />);
        const h2Encoutered = getByRole('heading', {level: 2});
        expect(h2Encoutered.textContent).toMatch(/Encoutered pokémons/i);
    });

    it('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
        const { getByTestId, getByText } = RenderWithRouter(<App />);
        const btnNext = getByTestId('next-pokemon');
        expect(btnNext).toHaveTextContent(/Próximo pokémon/i);
        fireEvent.click(btnNext);
        const nextPokemon = getByTextContent(/Próximo pokémon/i);
        fireEvent.click(btnNext);
        const nextPokemon = getByText('Charmander');
        expect(nextPokemon).toBeInTheDocument();
        data.forEach((_pokemon, index) => {
            if (index !== data.length - 1) {
                fireEvent.click(btnNext);
            }
        });
        const firstPokemon = getByText(/pikachu/i);
        expect(firstPokemon).toBeInTheDocument();
    });

    it('Verificar se tem os botões de filtro por tipo', () => {
        const { getAllByTestId } = RenderWithRouter(<App />);
        const btnFilter = getAllByTestId(pokemonTypeBtn);
        const expectedButtonLenght = 7;
        expect(btnFilter.length).toBe(expectedButtonLenght);
    })

    it('A partir da seleção de tipo deve circular somente pokemons de mesmo tipo', () => {
        const { getByTestId, getAllByTestId } = RenderWithRouter(<App />);
        const btnFilter = getAllByTestId(pokemonTypeBtn);
        const fireBtn = btnFilter.find((btn) => btn.innerHTML === 'Fire');
        fireEvent.click(fireBtn);
        expect(getByTestId(pokemonType).innerHTML).tobe('fire');
    });

    it('O texto do botão deve corresponder ao nome do tipo', () => {
        const { getByTestId, getAllByRole } = RenderWithRouter(<App />);
        const typeBtn = getAllByRole('button');
        const poisonTypeBtn = typeBtn.find((btn) => btn.innerHTML === 'Poison');
        fireEvent.click(poisonTypeBtn);
        expect(getAllByTestId(pokemonType).innerHTML).toMatch('Poison');
    });

    it('Teste se a pokédex contém um botão para resetar o filtro', () => {
        const { getAllByRole, getByText } = RenderWithRouter(<App />);
        const button = getByRole('button', { name: 'All' });
        const nofilter = getByText('Pikachu');
        fireEvent.click(button);
        expect(nofilter).toBeInTheDocument();
    });

    it('Cria dinamicamente os botôes de tipo', () => {
        const { getAllByTestId } = RenderWithRouter(<App />);
        const expectedBtns = 7;
        const buttons = getAllByTestId(pokemonTypeBtn);
        expect(buttons.length).toBe(expectedBtns);
    });
});
