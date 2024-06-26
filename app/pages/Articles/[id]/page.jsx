import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Goback from '@/app/components/goback'
import { getArticle } from '../lib';
import Goup from '@/app/components/goup';
import { IoIosFitness } from "react-icons/io";
import { BsPhone } from "react-icons/bs";
import { MdOutlinePets, MdOutlinePool } from "react-icons/md";
import { PiElevator } from "react-icons/pi";
import { LuConciergeBell } from "react-icons/lu";
import { GiKidSlide,GiFamilyHouse } from "react-icons/gi";
import { RiRuler2Line } from "react-icons/ri";

import { FaUser,FaBed,FaBath  } from "react-icons/fa";
import AdminHeader from '@/app/components/AdminHeader';
import Schedule from '@/app/components/Schedule';
import ContactAgent from '@/app/components/ContactAgent';


export async function generateMetadata({ params }) {
  const articleId = params.id;
  try {
    const articleDetails = await getArticle(articleId);
    if (articleDetails) {
      return {
        title: `Gracious Crossing | ${articleDetails.title || 'Page Not Found'}`,
      };
    } else {
      return {
        title: 'Gracious Crossing | Page Not Found',
      };
    }
  } catch (error) {
    return {
      title: 'Gracious Crossing | Page Not Found',
    };
  }
}







export default async function HomeDetailsPage({params}) {
  const articleId = params.id;

  // Fetch article details
  const post = await getArticle(articleId);
  const sanitizedPost = JSON.parse(JSON.stringify(post));
  const sanitiPost = JSON.parse(JSON.stringify(post));
 

  if (!post) {
    return <div>Article not found</div>;
  }
  const lastUpdatedDate = post.timestamp && post.timestamp.toDate();
  const formattedDate = lastUpdatedDate && `${lastUpdatedDate.toLocaleString('en-US', { timeZone: 'America/New_York', day: 'numeric', month: 'long', year: 'numeric' })} ${lastUpdatedDate.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: true })}`;
  

return (
<>
<AdminHeader/>
<Navbar />
<div   className="article-container">
{/**block for goback btn and title */}
<div className="backbtn-box">
<h1>{post.title}</h1>
<Goback/>
</div>
{/**block for goback btn and title */}
{/**block for img */}

<div className="imgbox">
  {post.cover_image && (
    <div className="cover-image-container">
      <img className="cover-image" src={post.cover_image} alt="Property Cover" />
    </div>
  )}
  <div className="showcase-images">
    {[...Array(20).keys()].map((index) => {
      const showcaseIndex = index + 1;
      const showcase = post[`cover_showcase${showcaseIndex}`];
      return (
        showcase && showcase !== '' && (
          <div
            className="showcase-img"
            style={{ backgroundImage: `url(${showcase})` }}
            key={`cover_showcase${showcaseIndex}`}
            alt={`Cover Showcase ${showcaseIndex}`}
          ></div>
        )
      );
    })}
  </div>
</div>




{!post.cover_image && <p>Error loading image</p>}




{/* < */}
{/**block for img */}
{/**block for category and author */}
<div className="authflex">
<p>{post.propertyType}</p>

<h3
style={{
display: 'flex',
placeItems: 'center',
fontWeight: '300',
}}
className="card-category">
<img className='authbox' src={post.authpic} style={{ maxWidth: '100%', height: '70px' }} />
</h3>
</div>
{/**block for category and author */}


<div className='details_header_title'>
<div  style={{display:'flex',alignItems:'center',margin:'0 0 1rem 0'}}>
<li style={{color:'red'}}></li>
  {post.billingFrequency ? 
    <span style={{marginRight:'auto', fontSize:'20px', fontWeight:'600'}}>
      {post.billingFrequency} 
    </span>
   : null}

{post.apartbillingFrequency2 ? (
  <span style={{marginRight:'auto',fontSize:'20px',fontWeight:'600'}}>{post.apartbillingFrequency2}</span>

) : null}



<div style={{
display:'grid'
}}>


{sanitizedPost && <Schedule post={sanitizedPost} />}
<ContactAgent post={sanitiPost} />

</div>

</div>
{post.apartavailability ? (
  <span style={{marginRight:'auto',fontSize:'20px',fontWeight:'300'}}><span style={{letterSpacing:'4px'}}>Availability</span> {post.apartavailability}</span>

) : null}

<div style={{
display:'flex',
flexDirection:'column',
}}>

<span style={{fontSize:'24px',fontWeight:'bold'}}>{post.price}</span>
<span style={{fontSize:'24px',fontWeight:'bold'}}>{post.apartprice} </span>
<span style={{fontWeight:'bold'}}> <FaBath/> {post.bathrooms} {post.apartbathrooms} Bath | <FaBed />  {post.bedrooms} {post.apartbedrooms} Beds | <RiRuler2Line /> {post.square} {post.apartsquare}  sqft</span> 

</div>


{post.units ? (
  <span style={{marginRight:'auto',fontSize:'20px',fontWeight:'300'}}>Unit# {post.units}</span>

) : null}
{post.billingFrequency2 ? (
  <p style={{fontWeight:'600'}}>
    {post.priceextra}/<small>{post.billingFrequency2}</small>
  </p>

) : null}
{post.opentime ? (
  <span className='sm-span' style={{display:'flex',color:'#4c4c4c'}}>Open {post.opentime}</span>

) : null}
<address className='sm-span'>
  {post.address}, {post.city}, {post.state.length > 2 ? `${post.state[0]}${post.state.slice(-1)}` : post.state}, {post.zip}
</address>


<div style={{
display:'flex',
alignItems:'center',
lineHeight:'2',
width:'15rem'
}}>
<span style={{fontSize:'24px'}}><BsPhone/></span>
<div style={{width:'1rem'}}></div>
<p>{post.phone}</p>
</div>



</div>

<p className='formatdate' style={{ margin: '1rem',lineHeight:'6' }}>
  Last Updated: {formattedDate}
</p>



<div style={{  margin: '1rem',lineHeight:'6' }}>Listing By: {post.owner}</div>

{post.primaryBedroomFeatures && (
<div style={{}} className="amenities-grid">
<span style={{ padding: '0 1rem', fontWeight: 'bold' }}>Interior</span>
<div className='sm-span interior-li' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' }}>
{post.primaryBedroom && <li>Double Master Bedroom</li>}
{post.primaryBedroomFeatures.includes("ensuiteBathroom") && <li>Ensuite Bathroom</li>}
{post.primaryBedroomFeatures.includes("walkInCloset") && <li>Walk-in Closet</li>}
{post.primaryBedroomFeatures.includes("Split Bedroom Plan") && <li>Split Bedroom Plan</li>}
{post.primaryBathFeatures && (
<>
{post.primaryBath && <li>Double Vanity</li>}
{post.primaryBathFeatures.includes("separateShower") && <li>Separate Shower</li>}
{post.primaryBathFeatures.includes("dualSinks") && <li>Dual Sinks</li>}
{post.primaryBathFeatures.includes("jacuzziTub") && <li>Jacuzzi Tub</li>}
</>
)}

{post.garageFeatures && (
<>
{post.garage && <li>Attached Garage</li>}
{post.garageFeatures.includes("automaticDoor") && <li>Automatic Door</li>}
{post.garageFeatures.includes("workbench") && <li>Work Bench</li>}
{post.garageFeatures.includes("cabinetStorage") && <li>Cabinet Storage</li>}
{post.garageFeatures.includes("floorDrain") && <li>Floor Drain</li>}
{post.garageFeatures.includes("insulatedWalls") && <li>Insulated Walls</li>}
{post.garageFeatures.includes("heatedFloors") && <li>Heated Floors</li>}
</>
)}

{post.basementFeatures && (
<>        
{post.basement && <li>Finished Basement</li>}
{post.basementFeatures.includes("wetBar") && <li>Wet Bar</li>}
{post.basementFeatures.includes("homeTheater") && <li>Home Theater</li>}
{post.basementFeatures.includes("fininshedbath") && <li>Fininshed Bath</li>}
{post.basementFeatures.includes("daylight") && <li>Daylight</li>}
</>
)}

{post.diningFeatures && (
<>
{post.dining && <li>Open Concept</li>}
{post.diningFeatures.includes("butlersPane") && <li>Butlers Pane</li>}
{post.diningFeatures.includes("builltInChina") && <li>Buillt-In China</li>}
{post.diningFeatures.includes("winecellar") && <li>Wine Cellar</li>}
</>
)}
</div>
</div>
)}





{(post.heating || post.sprink || post.laundry || post.cable || post.airConditioning || post.water || post.stoorage || post.wifi || post.walkin || post.framme || post.wheel) && (
  <div className='amenities-grid'>
    <span style={{ padding: '0 1rem',fontWeight:'bold' }}>Highlights</span>
    <div className='sm-span' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
      {post.heating && <li>Heating</li>}
      {post.laundry && <li>Washer/Dryer</li>}
      {post.cable && <li>Cable ready</li>}
      {post.airConditioning && <li>Air Conditioning</li>}
      {post.water && <li>Water is available</li>}
      {post.walkin && <li>Walk-In Shower</li>}
      {post.sprink && <li>Sprinkler System</li>}
      {post.smoke && <li>Smoke Free</li>}
      {post.stoorage && <li>Closet Storage</li>}
      {post.wifi && <li>WiFi</li>}
      {post.framme && <li>Framed Mirrors</li>}
      {post.wheel && <li>Wheelchair Accessible</li>}
    </div>
   
  </div>
)}
{
  (post.disposal ||
    post.dishwasher ||
    post.island ||
    post.kitchen ||
    post.microwave ||
    post.oven ||
    post.fridge ||
    post.freezer) && (
    <>
      <div style={{ }} className="amenities-grid"> 
           <span style={{ padding: '0 1rem',fontWeight:'bold' }}>Kitchen Appliances</span>
           <div className='sm-span' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
          
        {post.disposal && <li>Disposal</li>}
        {post.dishwasher && <li>Dishwasher</li>}
        {post.island && <li>Kitchen Island</li>}
        {post.kitchen && <li>Kitchen</li>}
        {post.microwave && <li>Microwave</li>}
        {post.oven && <li>Oven</li>}
        {post.fridge && <li>Fridge</li>}
        {post.freezer && <li >Freezer</li>}
         </div>
      </div>
    </>
  )}

{
(post.balcony

) && (
<>
<div style={{ }} className="amenities-grid"> 
<span style={{ padding: '0 1rem',fontWeight:'bold' }}>Floor Plans</span>
<div className='sm-span' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
{post.balcony && <li>Balcony</li>}
</div>
</div>
</>
)}



{
 (post.gym ||
post.pool ||
post.elevator ||
post.concierge ||
post.play ||
post.manager ||
post.pet 
) && (
<>
<h2 className='sm-aboutspan' style={{ padding: '0 1rem',color:'#646464',fontSize:'1.875rem' }}>Community Amenities</h2>
<div style={{borderBottom:'none'}} className='cards' >  
{post.gym && (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'solid 1px #c3c3c3',padding:'1rem',width:'50%'}}>
    <span style={{fontSize:'4.0625rem'}}><IoIosFitness /></span>
    <span style={{fontSize:'1rem'}}> Fitness Center</span>
  </div>
)}

{post.pool && (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'solid 1px #c3c3c3',padding:'1rem',width:'50%'}}>
    <span style={{fontSize:'4.0625rem'}}><MdOutlinePool /></span>
    <span style={{fontSize:'1rem'}}>Swimming Pool</span>
  </div>
)}

{post.elevator && (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'solid 1px #c3c3c3',padding:'1rem',width:'50%'}}>
    <span style={{fontSize:'4.0625rem'}}><PiElevator /></span>
    <span style={{fontSize:'1rem'}}> Elevator</span>
  </div>
)}

{post.concierge && (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'solid 1px #c3c3c3',padding:'1rem',width:'50%'}}>
    <span style={{fontSize:'4.0625rem'}}><LuConciergeBell /></span>
    <span style={{fontSize:'1rem'}}> Concierge</span>
  </div>
)}

{post.play && (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'solid 1px #c3c3c3',padding:'1rem',width:'50%'}}>
    <span style={{fontSize:'4.0625rem'}}><GiKidSlide /></span>
    <span style={{fontSize:'1rem'}}> Playground</span>
  </div>
)}

{post.club && (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'solid 1px #c3c3c3',padding:'1rem',width:'50%'}}>
    <span style={{fontSize:'4.0625rem'}}><GiFamilyHouse  /></span>
    <span style={{fontSize:'1rem'}}> Clubhouse</span>
  </div>
)}

{post.pet && (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'solid 1px #c3c3c3',padding:'1rem',width:'50%'}}>
    <span style={{fontSize:'4.0625rem'}}><MdOutlinePets   /></span>
    <span style={{fontSize:'1rem'}}> Pet Friendly</span>
  </div>
)}
{post.manager && (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'solid 1px #c3c3c3',padding:'1rem',width:'50%'}}>
    <span style={{fontSize:'4.0625rem'}}><FaUser   /></span>
    <span style={{fontSize:'1rem'}}> On-Site Manager</span>
  </div>
)}




</div>
     
   
     
       
    
   
  </>
)}










<hr />
<h2 className='sm-aboutspan' style={{  margin: '1rem',fontSize:'1.875rem',color:'#5a5a5a' }}>About {post.title}</h2>
<div className="body-content" ><p>{post.aboutcontent}</p></div>



<div className='artilceGoUpbtn'><Goup/></div>
</div>
<Footer/>
</>
)
}
