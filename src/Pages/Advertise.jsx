import React from 'react'
import Footer from '../Components/Footer'
import { Navbar } from '../Components/Navbar'

export const Advertise = () => {
return (
<>
<Navbar/>
<div style={{
margin:'30px auto',
borderBottom:'solid blue 1px'
}}>
<h1 style={{
textAlign:'center',
fontSize:'30px',
marginBottom:'30px'
}}>Advertise Your Business with Gracious Crossing
</h1>
<p style={{
fontSize:'17px',
textAlign:'center',
marginBottom:'30px'
}}>Reach millions of buyers, dealers and leaseholders on the biggest genuine network organization on the net.

</p>
</div>

<div style={{
textAlign:'center'
}}>
<h1 style={{
fontWeight:'100',
textTransform:'capitalize'
}}
>Select your industry</h1>
</div>



<Footer/>
</>
)
}
