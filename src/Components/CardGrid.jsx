import React from 'react';
import '../css/cardgrid.css'
import { Card } from './Card';


const CardGrid = () => {
const cards = [
{
title: '3d model software',
imgSrc: require('../img/cardflex-img1.jpg'),
content: 'Create a 3d model of your property.',
buttonText: 'Explore Now',
},

{
title: 'plan ahead',
imgSrc: require('../img/cardflex-img2.jpg'),
content: 'Our professional Realtors have info on buying a home.',
buttonText: 'Explore Now',

},

{
title: 'Manage Property',
imgSrc: require('../img/cardflex-img3.jpg'),
content: 'Easily manage your property through Gracious Crossing.',
buttonText: 'Explore Now',

},

];

return (
<div className="card-grid">
{cards.map((card,index) => (
<Card
key={index}
title={card.title}
imgSrc={card.imgSrc}
content={card.content}
buttonText={card.buttonText}
buttonLink={card.buttonLink}
/>
))}
</div>
);
};

export default CardGrid;