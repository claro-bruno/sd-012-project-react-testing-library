import pokemons from '../data';

const mockFetchPokemonTypes = [
  ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
];

export default mockFetchPokemonTypes;
