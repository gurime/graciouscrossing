import React from 'react'
import Footer from '../Components/Footer'
import { Navbar } from '../Components/Navbar'
import { Link } from 'react-router-dom'
import cardimg1 from '../img/card-img1.jpeg'
import cardimg2 from '../img/card-img2.jpg'
import cardimg3 from '../img/card-img3.jpg'
import '../css/home.css'


import CardGrid from '../Components/CardGrid'
const Home = () => {
document.title = 'Gracious Crossing '
return (
  
<>
<Navbar/>
<div className="hero">
<div className='hero-textblock'>
<p>Finding your home is our top priorty</p>
<div>
<input type="search" placeholder='Let`s find your new home'/>
</div>
</div>
</div>

<h1 className='tagline-title'>The internets #1 site to find a home</h1>



<div className="card-block">
<div className="tagline-header">
<h1>Find the best homes</h1>
<p>Browse some of the highest 
quality homes, list your property, 
sign a lease and more.</p>
<Link to='#!'>More Info</Link>
</div>
<img src={cardimg1} alt="" />
</div>

<div className="card-block card-block-reverse">
<img src={cardimg2} alt="" />
<div className="tagline-header tagline-header-reverse">
<h1>List your property</h1>
<p>Reach millions of renters by listing your property.</p>
<Link to='#!'>Add your listings</Link>
</div>
</div>

<div className="card-block">
<div className="tagline-header">
<h1>Tips for new House owners</h1>
<p>Check out our guides for tips on owning your first home.</p>
<Link to='#!'>Articles</Link>
</div>
<img src={cardimg3} alt="" />
</div>

<CardGrid/>


<Footer/>
</>
)
}

export default Home