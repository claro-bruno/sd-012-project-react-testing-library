import React from 'react';
import './about.css';

const About = () => (
  <section data-testid='about'>
    <h2>{ `About Pokédex` }</h2>
    <section>
      <p data-testid='info1' title='info'>
        This application simulates a Pokédex, a
        digital encyclopedia containing all Pokémons
      </p>
      <p data-testid='info2' title='info'>One can filter Pokémons by type, and see more details for each one of them</p>
      <img
        className="pokedex-image"
        src={ `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png` }
        alt="Pokédex"
      />
    </section>
  </section>
);

export default About;
