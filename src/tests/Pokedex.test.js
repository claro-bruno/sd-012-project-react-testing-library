import React from 'react'
import { screen } from '@testing-library/react'
import renderWithRouter from './renderWithRouter'
import App from '../App'

describe('Teste o componente <Pokedex.js />', () => {
  test('este se página contém um heading h2 com o texto Encountered pokémons.', () =>{
    renderWithRouter(<App />)
    const h2 = screen.getByText(/Encountered pokémons/i)
    expect(h2).toBeInTheDocument()
  })

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />)
    const button = screen.getByTestId('next-pokemon')
    expect(button).toHaveTextContent('Próximo pokémon')
  })

})