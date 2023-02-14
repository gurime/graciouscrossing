import React from 'react'
import { Link } from 'react-router-dom'
import footlogo from '../img/Gracious-crossing.png'

const Footer = () => {
  const scrollTo = () =>{
    window.scroll({top: 0,
    behavior: "smooth"
    })
    } 
return (
<>
<footer>
<div className="flex-footer">
<div className="footer-tablebox">
<div className="footer-headline">Who We Are</div>
<div className="footer-seperator"></div>
<ul className="footer-navlink">
<li><Link>Career</Link></li>
<div className="footer-seperator"></div>
<li><Link>About Gracious Crossing</Link></li>
<div className="footer-seperator"></div>
<li><Link>Press Center</Link></li>
<div className="footer-seperator"></div>
<li><Link>Investor Relations</Link></li>
<div className="footer-seperator"></div>
<li><Link>Advertise</Link></li>
<div className="footer-seperator"></div>
<li><Link>Company News</Link></li>
<div className="footer-seperator"></div>
</ul>
</div>
{/* first tablebox stops here */}
<div className="footer-tablebox">
<div className="footer-headline">Featured</div>
<div className="footer-seperator"></div>
<ul className="footer-navlink">
<li><Link>New York, NYC</Link></li>
<div className="footer-seperator"></div>
<li><Link>Atlanta, GA</Link></li>
<div className="footer-seperator"></div>
<li><Link>Miami, Florida</Link></li>
<div className="footer-seperator"></div>
<li><Link>Los Angeles, California</Link></li>
<div className="footer-seperator"></div>
<li><Link>Seattle, Washington</Link></li>
<div className="footer-seperator"></div>
<li><Link>Washington DC</Link></li>
<div className="footer-seperator"></div>
</ul>
</div>
{/* second tablebox stops here */}
<div className="footer-tablebox">
<div className="footer-headline">Make Money</div>
<div className="footer-seperator"></div>
<ul className="footer-navlink">
<li><Link>Invest</Link></li>
<div className="footer-seperator"></div>
<li><Link>Affiliate</Link></li>
<div className="footer-seperator"></div>
<li><Link>Property Listing</Link></li>
<div className="footer-seperator"></div>
<li><Link>Real Estate</Link></li>
<div className="footer-seperator"></div>
<li><Link>Mortgage</Link></li>
<div className="footer-seperator"></div>
<li><Link>Lender</Link></li>
<div className="footer-seperator"></div>
</ul>
</div>
{/* third tablebox stops here */}
<div className="footer-tablebox" style={{borderRight:'none',borderBottom:'none'}}> 
<div className="footer-headline">Help</div>
<div className="footer-seperator"></div>
<ul className="footer-navlink">
<li><Link to='#!'>Contact Us</Link></li>
<div className="footer-seperator"></div>
<li><Link to='#!' >FAQs</Link></li>
<div className="footer-seperator"></div>
<li><Link to='#!' >COVID-19 </Link></li>
<div className="footer-seperator"></div>
<li><Link to='#!' >Send Feedback</Link></li>
<div className="footer-seperator"></div>
<li><Link to='#!' >Privacy Policies</Link></li>
<div className="footer-seperator"></div>
<li><Link to='#!'>Avoid Scams</Link></li>
<div className="footer-seperator"></div>
</ul>
</div>
{/* fourth tablebox stops here*/}
</div>

<hr style={{color:'#fff',border:'solid 1px'}}/>
        
    
<p className='footer-copyright' style={{color:'#fff',textAlign:'center'}}>
&#169; Gracious Crosing or its affiliated companies. All rights reserved. 
</p>

<div className="footer-logo-box">

<img onClick={scrollTo}  src={footlogo} alt="this is the Gracious_Crosing logo"/>

</div>
</footer>
</>
)
}

export default Footer