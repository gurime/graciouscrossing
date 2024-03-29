'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import footLogo from '../img/gracious_logo.png'
import Image from 'next/image'
import navlogo from '../img/GraciousCross.png'

const Footer = () => {

const scrollTo = () =>{
window.scroll({top: 0,

})
}  

const router = useRouter()
return (
<>


<footer id="footer">

<div className="flex-footer">
<div className="footer-tablebox"> 
<div className="footer-headline">Get To Know Us</div>

<ul className="footer-navlink">
<li><Link href='#!'>Career</Link></li>

<li><Link href='#!'>Company News</Link></li>

<li><Link href='/pages/About'>About Gracious Crossing</Link></li>

<li><Link href='#!'>Investor Relations </Link></li>

<li><Link href='#!' >Advertise</Link></li>
<li><Link href="/pages/Faq">Faq</Link></li>



</ul>
</div>
{/*first tablebox stops here*/}
<div className="footer-tablebox"> 
  <div className="footer-headline">Home Shopping</div>

  <ul className="footer-navlink">
    <li><Link href='/pages/Houses'>Homes for Sale & Rent</Link></li>
    <li><Link href='/pages/Apartments'>Apartments for Rent</Link></li>
    <li><Link href='/pages/NewConstruction'>New Construction</Link></li>
    <li><Link href='/pages/Motel'>Motel</Link></li>
    <li><Link href='/pages/GreenHomes'>Green Homes</Link></li>
    <li><Link href='/pages/HistoricHomes'>Historic Homes</Link></li>
    <li><Link href='#!'>Luxury Homes</Link></li>
    <li><Link href='#!'>Vacation Rentals</Link></li>
    <li><Link href='#!'>Conodominiums</Link></li>
  </ul>
</div>

{/*seconds tablebox stops here*/}
<div className="footer-tablebox"> 
  <div className="footer-headline">Global Real Estate</div>

  <ul className="footer-navlink">
    <li><Link href='#!'>Canada</Link></li>
    <li><Link href='#!'>Mexico</Link></li>
    <li><Link href='#!'>South America</Link></li>
    <li><Link href='#!'>Africa</Link></li>
    <li><Link href='#!'>Egypt</Link></li>
    <li><Link href='#!'>Europe</Link></li>
    <li><Link href='#!'>Asia</Link></li>
    <li><Link href='#!'>Australia</Link></li>

  </ul>
</div>

{/*third tablebox stops here*/}
<div className="footer-tablebox" style={{ borderRight: 'none' }}> 
  <div className="footer-headline">Home & Lifestyle</div>

  <ul className="footer-navlink">
    <li><Link href='#!'>Home Decor</Link></li>
    <li><Link href='#!'>Auto & Home</Link></li>
    <li><Link href='#!'>Home & Living</Link></li>
    <li><Link href='#!'>Pets & Tips</Link></li>
    <li><Link href='#!'>Health & Fitness</Link></li>
    <li><Link href='#!'>Family & Friends</Link></li>
    <li><Link href='#!'>Spirituality & Faith</Link></li>
    <li><Link href='#!'>Books & Literature</Link></li>
    <li><Link href='#!'>Community News</Link></li>
  </ul>
</div>

{/*fourth tablebox stops here*/}
<div className="footer-tablebox" style={{borderRight:'none',borderLeft:'solid 1px #fff'}}> 
<div className="footer-headline">Health</div>

<ul className="footer-navlink" style={{borderBottom:'none'}}>
<li><Link  href='#!'>Mental Health</Link></li>

<li><Link  href='#!'>Children's Health</Link></li>

<li><Link  href='#!'>Heart Health</Link></li>

<li><Link  href='#!'>Pet Health</Link></li>

<li><Link  href='#!'>Eye Health</Link></li>

<li><Link  href='#!'>Healthy Living </Link></li>

<li><Link  href='#!'>Medical Reasearch</Link></li>

<li><Link  href='#!'> Cancer</Link></li>





</ul>
</div>
{/*fourth tablebox stops here*/}


</div>

<div style={{backgroundColor:'transparent'}}  className="nav">
<Image style={{margin:'auto ',cursor:'pointer'}} title='Home Page' onClick={() => router.push('/')} src={navlogo} width={200} alt='...'  />






<div className="navlinks sm-navlink" style={{flexWrap:'nowrap'}}>
<Link  href='/pages/Contact'>Contact Gracious Crossing</Link>

<Link  href='/pages/Terms'>terms of Use</Link>

<Link  href='/pages/Privacy'>Privacy Policies </Link>

<Link style={{border:'none'}}  href='../pages/Cookie'>Cookie Policies</Link>


</div>
</div>





<hr />
<div style={{
color:'#fff',
padding:'1rem 0',
textAlign:'center'
}}>
   &#169;2024 Gracious Crossing, LLC All Rights Reserved <br />

</div>
<hr />




<div className="footer-logo-box">

<Image title='Back To Top' width={36} onClick={scrollTo}  src={footLogo} alt="..." />

</div>
</footer>






</>
)
}

export default Footer