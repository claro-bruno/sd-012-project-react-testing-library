import pokemons from '../data';

const mockPokemonTypes = [
  ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
];

export default mockPokemonTypes;
