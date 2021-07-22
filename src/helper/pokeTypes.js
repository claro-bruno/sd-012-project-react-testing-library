import data from '../data';

const pokeTypes = data.reduce((acc, item) => {
  if (!acc.includes(item.type)) acc = [...acc, item.type];
  return acc;
}, []);

export default pokeTypes;
