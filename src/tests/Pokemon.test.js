import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// npx stryker run ./stryker/Pokemon.conf.json

describe('6. Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const pikachuType = screen.getAllByText(/Electric/i);
    expect(pikachuType).toHaveLength(2);
  });

  it('O peso correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const pikachuWeight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pikachuWeight).toBeInTheDocument();
  });

  it('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    const pikachuPicture = screen.getByRole('img',
      { name: 'Pikachu sprite' });
    expect(pikachuPicture).toBeInTheDocument();
    expect(pikachuPicture.src).toStrictEqual(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('Contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const pikachuLink = screen.getByRole('link', { name: /More Details/i });
    expect(pikachuLink).toBeInTheDocument();
    userEvent.click(pikachuLink);
    expect(history.location.pathname).toStrictEqual('/pokemons/25');

    const favoriteCheckButton = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckButton);
    const pikachuStar = screen.getByRole('img',
      { name: 'Pikachu is marked as favorite' });
    expect(pikachuStar.src).toStrictEqual('http://localhost/star-icon.svg');
  });
});
