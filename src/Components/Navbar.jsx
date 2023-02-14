import React from 'react'
import { NavLink} from 'react-router-dom'
import navlogo from '../img/Gracious-crossing.png'

export const Navbar = () => {
return (
    <>

<nav className='navbar'>
<div className="logo">
<NavLink to='/'><img src={navlogo} alt="" /></NavLink>
</div>
<ul className='navlinks'>
<li><NavLink to="/advertise">Advertise</NavLink></li>
<li><NavLink to="/manageproperty">Manage Property</NavLink></li>
<li><NavLink to="/signin">Sign In</NavLink></li>
<li><NavLink to="/signup">Sign up</NavLink></li>
<li><NavLink to="/help">Help</NavLink></li>
</ul>
</nav>

</>
)
}
