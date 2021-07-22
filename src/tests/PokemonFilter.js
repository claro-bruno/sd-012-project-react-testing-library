function PokemonFilter(screen, name) {
  const PokeName = screen.getByTestId('pokemon-name');
  const PokeType = screen.getByTestId('pokemon-type');
  const PokeWeight = screen.getByTestId('pokemon-weight');
  const PokeURL = screen.getByAltText(`${name} sprite`);
  const PokeDetails = screen.getByText(/More details/);
  return ({
    PokeName,
    PokeType,
    PokeWeight,
    PokeURL,
    PokeDetails,
  });
}

export default PokemonFilter;
