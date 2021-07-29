import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa componente PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /More details/i }));
});

    test('Teste se a pagina mostra informacoes detalhadas', () => {
        const { name, summary } = pokemons[0];
        const h2pokemon = screen.getByRole('heading', { name: `${name} Details` });
        expect(h2pokemon.localName).toBe('h2');

        const link = screen.queryByRole('link', { name: /More details/i });
        expect(link).not.toBeInTheDocument();
        
        const summary = screen.getByRole('heading', { name: /Summary/i });
        expect(summary.localName).toBe('h2');

        const summaryParagraph = screen.getByText(summary);
        expect(summaryParagraph).toBeInTheDocument();
        expect(summaryParagraph.localName).toBe('p');
  });
    test('Testa se aparecem mapas da localozação do pokémon', () => {


    })


  });


