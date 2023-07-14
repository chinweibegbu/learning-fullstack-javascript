import { animals } from './animals';
import React from 'react';
import { createRoot } from 'react-dom/client';

function displayFact(e) {
  const selectedAnimal = e.target.alt;
  const optionIndex = Math.floor(Math.random() * selectedAnimal.facts.length);
  const funFact = selectedAnimal.facts[optionIndex];
  document.getElementById('fact').innerHTML = funFact;
}

const container = document.getElementById('app');
const root = createRoot(container);
const title = "";
const background = <img src="/images/ocean.jpg" className="background" alt="ocean" />
const images = [];
for (const animal in animals) {
  const image = (<img 
    src={animals[animal].image}
    alt={animal}
    aria-label={animal}
    key={animal}
    className='animal'
    role='button'
    onClick={displayFact}/>
  );
  images.push(image);
}

const animalFacts = (
<div>
  <h1>{title === "" ? "Click an animal for a fun fact" : title}</h1>
  {background}
  <p id='fact'></p>
  <div className='animals'>
    {images}
  </div>
</div>
);

root.render(animalFacts);
