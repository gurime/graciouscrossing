'use client'
import { auth } from '@/app/Config/firebase';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export default function PropertyForm() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [tourTime, setTourTime] = useState("");
  const [priceextra, setPriceextra] = useState("");
  const [billingFrequency, setBillingFrequency] = useState('');
  const [billingFrequency2, setBillingFrequency2] = useState('');
  const [bedrooms, setBedrooms] = useState("1");
  const [bathrooms, setBathrooms] = useState("1");
  const [square, setSquare] = useState( "");
  const [city, setCity] = useState( "");
  const [state, setState] = useState( "");
  const [zip, setZip] = useState( "");
  const [address, setAddress] = useState("");

  
//amenities
const [cable, setCable] = useState(false);
const [laundry, setLaundry] = useState(false);
const [lights, setLights] = useState(false);
const [water, setWater] = useState(false);
const [heating, setHeating] = useState(false);
const [pool, setPool] = useState(false);
const [wifi, setWifi] = useState(false);
const [airConditioning, setAirConditioning] = useState(false);
const [gym, setGym] = useState(false);
const [parking, setParking] = useState(false);
//amenities
const [ isLoading, setIsLoading] = useState(false)
//pictures
const [coverImageFile, setCoverImageFile] = useState(null);
const [showcase1File, setShowcase1File] = useState(null);  
const [showcase2File, setShowcase2File] = useState(null);  
const [showcase3File, setShowcase3File] = useState(null);  
const [showcase4File, setShowcase4File] = useState(null);  
const [showcase5File, setShowcase5File] = useState(null);  
const [authpicFile, setAuthPicFile] = useState(null);  
//pictures
const [articleId, setArticleId] = useState("");  
const [ selectedCollection, setSelectedCollection] = useState("Houses")
const [successMessage, setSuccessMessage] = useState("");

const [names, setNames] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const router = useRouter();
    
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
  const getUserData = async (userId) => {
  try {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', userId);
  const userDocSnapshot = await getDoc(userDocRef);
  if (userDocSnapshot.exists()) {
  const userData = userDocSnapshot.data();
  return userData;
  } else {
  return null;
  }
  } catch (error) {
  throw error;
  }
  };
  setIsSignedIn(!!user);
  if (user) {
  try {
  const userData = await getUserData(user.uid);
  setNames([userData.firstName, userData.lastName]);
  } catch (error) {
  handleError(error);
  } finally {
  setIsLoading(false)
  }
  }
  });
  return () => unsubscribe();
  }, []);
  
  const handleError = (error) => {
  if (error.code === 'network-error') {
  setErrorMessage('Network error: Please check your internet connection.');
  } else if (error.code === 'invalid-content') {
  setErrorMessage('Invalid comment content. Please try again.');
  } else {
  setErrorMessage('Unexpected error occurred. Please try again later.');
  }
  };
  
  
    
  const handleAuthPicChange = (e) => {
  // Set the selected cover image file to state
  const file = e.target.files[0];
  setAuthPicFile(file);
  };
  const handleCoverImageChange = (e) => {
  // Set the selected cover image file to state
  const file = e.target.files[0];
  setCoverImageFile(file);
  };
    
  
  const handleShowcase1Change = (e) => {
  const file = e.target.files[0];
  setShowcase1File(file);
  };
  
  const handleShowcase2Change = (e) => {
  const file = e.target.files[0];
  setShowcase2File(file);
  };
  
  const handleShowcase3Change = (e) => {
  const file = e.target.files[0];
  setShowcase3File(file);
  };
  const handleShowcase4Change = (e) => {
  const file = e.target.files[0];
  setShowcase4File(file);
  };
  const handleShowcase5Change = (e) => {
  const file = e.target.files[0];
  setShowcase5File(file);
  };

  const storage = getStorage(); // Initialize Firebase Storage
  const handleFileUpload = async (file, storagePath) => {
  try {
  const storageRef = ref(storage, storagePath);
  await uploadBytesResumable(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
  } catch (error) {
  throw error;
  }
  };
  
  
const handleSubmit = async (e) => {
e.preventDefault();
try {
const auth = getAuth();
const user = auth.currentUser;
setIsLoading(true);
const uniqueArticleId = uuidv4();
setArticleId(uniqueArticleId);
const authpic = authpicFile ? await handleFileUpload(authpicFile, `images/${uniqueArticleId}authpic.jpg`, uniqueArticleId) : null;
const cover_image = coverImageFile ? await handleFileUpload(coverImageFile, `images/${uniqueArticleId}cover_image.jpg`) : null;
const cover_showcase1 = showcase1File ? await handleFileUpload(showcase1File, `images/${uniqueArticleId}cover_showcase1.jpg`) : null;
const cover_showcase2 = showcase2File ? await handleFileUpload(showcase2File, `images/${uniqueArticleId}cover_showcase2.jpg`) : null;
const cover_showcase3 = showcase3File ? await handleFileUpload(showcase3File, `images/${uniqueArticleId}cover_showcase3.jpg`) : null;
const cover_showcase4 = showcase4File ? await handleFileUpload(showcase4File, `images/${uniqueArticleId}cover_showcase4.jpg`) : null; 
const cover_showcase5 = showcase5File ? await handleFileUpload(showcase5File, `images/${uniqueArticleId}cover_showcase5.jpg`) : null;

  
        
    
const db = getFirestore();
const docRef = await addDoc(collection(db, selectedCollection), {
userId: user.uid,
content: content,
title: title,
owner: owner,
phone:phone,
price: price,
priceextra: priceextra,
bedrooms: bedrooms,
bathrooms: bathrooms,
square: square,
billingFrequency: billingFrequency,
billingFrequency2: billingFrequency2,
water: water,
lights: lights,
cable: cable,
laundry: laundry,
airConditioning: airConditioning,
heating: heating,
pool: pool,
wifi: wifi,
address: address,
city:city,
state:state,
zip:zip,
gym: gym,
parking: parking,
tourTime: tourTime,
timestamp: new Date(),
userEmail: user.email,
authpic: authpic,
cover_image: cover_image,
cover_showcase1: cover_showcase1,
cover_showcase2: cover_showcase2,
cover_showcase3: cover_showcase3,
cover_showcase4: cover_showcase4,
cover_showcase5: cover_showcase5,
propertyType: selectedCollection,  
});
  
const formattedPageName = selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1);
router.push(`/pages/${formattedPageName}`);
} catch (error) {
setErrorMessage('Error. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
} finally {
setIsLoading(false);
}
};
  

    
  
  
  const handleTourTimeChange = (e) => {
    setTourTime(e.target.value);
  };
  
  
  const timeOptions = [
    "9:00 AM", "9:30 AM", "9:40 AM", "10:00 AM", "10:30 AM", "10:40 AM",
    "11:00 AM", "11:30 AM", "11:40 AM", "12:00 PM", "12:30 PM", "12:40 PM",
    "1:00 PM", "1:30 PM", "1:40 PM", "2:00 PM", "2:30 PM", "2:40 PM",
    "3:00 PM", "3:30 PM", "3:40 PM", "4:00 PM", "4:30 PM", "4:40 PM",
    
  ];
  
  
  


return (
    <>
<div className='adminform_bg'>
<form className="adminform" onSubmit={handleSubmit}>
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Provide Your Contact Information</h2>
</div>

<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="property-name">Property Name:</label>
<input
type="text"
id="property-name"
name="title"
value={title}
onChange={(e) => setTitle(e.target.value)}
required
/>
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="owner-name">Owner Name:</label>
<input
type="text"
id="owner-name"
name="owner"
value={owner}
onChange={(e) => setOwner(e.target.value)}
required
/>
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="phone-number">Phone Number:</label>
<input
type="tel"
id="phone-number"
name="phone"
value={phone}
onChange={(e) => setPhone(e.target.value)}
required
/>
</div>
</div>

<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Provide Property Pricing Information</h2>
</div>

<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="price">Property Price:</label>
    <input
      type="text"
      id="price"
      name="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      required
    />
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="billingFrequency">Payment Frequency:</label>
    <select
      name="billingFrequency"
      value={billingFrequency}
      onChange={(e) => setBillingFrequency(e.target.value)}
      required
      className='billingselect'
    >
      <option value="">Select Payment Frequency</option>

      <option value="Monthly">Monthly</option>
      <option value="Weekly">Weekly</option>
      <option value="Rent">Rent</option>
      <option value="For Sale">For Sale</option>
    </select>
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="priceextra">Financing Price: </label>
    <input
      type="text"
      name="priceextra"
      value={priceextra}
      onChange={(e) => setPriceextra(e.target.value)}
    />
    <label htmlFor="billingFrequency2">Financing Type:</label>
    <select
      style={{ marginLeft: '1px' }}
      name="billingFrequency2"
      value={billingFrequency2}
      onChange={(e) => setBillingFrequency2(e.target.value)}
      className='billingselect'
    >
                  <option value="">Select Payment Frequency</option>

      <option value="Monthly">Monthly</option>
      <option value="Weekly">Weekly</option>
      <option value="RentToOwn">Rent to Own</option>
      <option value="For Sale">For Sale</option>
    </select>
  </div>

</div>
<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Provide Property Information</h2>
</div>

<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="selectedCollection">Property Type:</label>
    <select
      name="selectedCollection"
      value={selectedCollection}
      onChange={(e) => setSelectedCollection(e.target.value)}
      required
      className='billingselect'
    >
            <option value="">Select Property</option>

<option value="Houses">Houses</option>
<option value="Apartments">Apartments</option>
<option value="Motel">Motel</option>
<option value="NewConstruction">New Construction</option>
<option value="GreenHomes">Green Homes</option>
<option value="HistoricHomes">Historic Homes</option>
    </select>
  </div>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="bedrooms">Bedrooms:</label>
<input
type="number"
name="bedrooms"
value={bedrooms}
onChange={(e) => setBedrooms(e.target.value)}
required
/>
  </div>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

<label htmlFor="bathrooms">Bathrooms:</label>
<input
type="number"
name="bathrooms"
value={bathrooms}
onChange={(e) => setBathrooms(e.target.value)}
required
/>
</div>


<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

<label htmlFor="square">Property Size:</label>
<input
type="number"
id="square"
name="square"
onChange={(e) => setSquare(e.target.value)}
/> 
</div>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="tourTime">Tour Time</label>
<select
id="tourTime"
name="tourTime"
value={tourTime}
onChange={handleTourTimeChange}
required
>
<option value="" disabled>Select tour time</option>
{timeOptions.map((option) => (
<option key={option} value={option}>{option}</option>
))}
</select>
</div>

</div>
<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Select Amenities</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="water"style={{ color: water ? 'skyblue' : '#fff' }}
>Water:</label>
<input
type="radio"
id="water"
name="water"
checked={water}
onChange={(e) => setWater(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="lights" style={{ color: lights ? 'yellow' : '#fff' }}>Lights:</label>
<input
type="radio"
id="lights"
name="lights"
checked={lights}
onChange={(e) => setLights(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="cable" style={{ color: cable ? 'purple' : '#fff' }}>Cable:</label>
<input
type="radio"
id="cable"
name="cable"
checked={cable}
onChange={(e) => setCable(e.target.value)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="laundry" style={{ color: laundry ? '#5AB60D' : '#fff' }}>laundry:</label>
<input
type="radio"
id="laundry"
name="laundry"
checked={laundry}
onChange={(e) => setLaundry(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="airConditioning" style={{ color: airConditioning ? '#5DE2E7' : '#fff' }}>AC:</label>
<input
type="radio"
id="airConditioning"
name="airConditioning"
checked={airConditioning}
onChange={(e) => setAirConditioning(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="heating" style={{ color: heating ? '#ff0808' : '#fff' }}>Heating:</label>
<input
type="radio"
id="heating"
name="heating"
checked={heating}
onChange={(e) => setHeating(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="pool" style={{ color: pool ? '#2877ff' : '#fff' }}>Swimming Pool:</label>
<input
type="radio"
id="pool"
name="pool"
checked={pool}
onChange={(e) => setPool(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="wifi" style={{ color: wifi ? '#007fff' : '#fff' }}>Wifi:</label>
<input
type="radio"
id="wifi"
name="wifi"
checked={wifi}
onChange={(e) => setWifi(e.target.checked)}
/>
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="gym" style={{ color: gym ? '#ff9900' : '#fff' }}>Gym:</label>
  <input
    type="radio"
    id="gym"
    name="gym"
    checked={gym}
    onChange={(e) => setGym(e.target.checked)}
  />
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="parking" style={{ color: parking ? '#cb6464' : '#fff' }}>Parking:</label>
  <input
    type="radio"
    id="parking"
    name="parking"
    checked={parking}
    onChange={(e) => setParking(e.target.checked)}
  />
</div>

</div>
<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Property Images</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="authpic">Property Logo:</label>
<input
type="file"
id="authpic"
name="authpic"
accept="image/*"
required
onChange={handleAuthPicChange}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="cover_image">Property Featured Image:</label>
<input
type="file"
id="cover_image"
name="cover_image"
accept="image/*"
required

onChange={handleCoverImageChange}
/>
</div> 
<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase1">Property Showcase Image 1: </label>
<input
  type="file"
  id="showcase1"
  name="showcase1"
  accept="image/*"
  onChange={handleShowcase1Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase2">Property Showcase Image 2: </label>
<input
  type="file"
  id="showcase2"
  name="showcase2"
  accept="image/*"
  onChange={handleShowcase2Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase3">Property Showcase Image 3: </label>
<input
  type="file"
  id="showcase3"
  name="showcase3"
  accept="image/*"
  onChange={handleShowcase3Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase4">Property Showcase Image 4: </label>
<input
  type="file"
  id="showcase4"
  name="showcase4"
  accept="image/*"
  onChange={handleShowcase4Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase5">Property Showcase Image 5: </label>
<input
  type="file"
  id="showcase5"
  name="showcas5"
  accept="image/*"
  onChange={handleShowcase5Change}
/>
</div>

</div>
<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Property Location</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="address">Address:</label>
    <input
      type="text"
      id="address"
      name="address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      required
    />
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="city">City:</label>
    <input
      type="text"
      id="city"
      name="city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      required
    />
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="state">State:</label>
    <select
id="state"
name="state"
value={state}
onChange={(e) => setState(e.target.value)}
required>
<option value="">Select a state</option> 
<option value="Alabama">Alabama</option> 
<option value="Alaska">Alaska</option> 
<option value="Arizona">Arizona</option> 
<option value="Arkansas">Arkansas</option> 
<option value="California">California</option> 
<option value="Colorado">Colorado</option> 
<option value="Connecticut">Connecticut</option> 
<option value="Delaware">Delaware</option> 
<option value="Florida">Florida</option> 
<option value="Georgia">Georgia</option> 
<option value="Hawaii">Hawaii</option> 
<option value="Idaho">Idaho</option> 
<option value="Illinois">Illinois</option> 
<option value="Indiana">Indiana</option> 
<option value="Iowa">Iowa</option> 
<option value="Kansas">Kansas</option> 
<option value="Kentucky">Kentucky</option> 
<option value="Louisiana">Louisiana</option> 
<option value="Maine">Maine</option> 
<option value="Maryland">Maryland</option> 
<option value="Massachusetts">Massachusetts</option> 
<option value="Michigan">Michigan</option> 
<option value="Minnesota">Minnesota</option> 
<option value="Mississippi">Mississippi</option> 
<option value="Missouri">Missouri</option> 
<option value="Montana">Montana</option> 
<option value="Nebraska">Nebraska</option> 
<option value="Nevada">Nevada</option> 
<option value="New Hampshire">New Hampshire</option> 
<option value="New Jersey">New Jersey</option> 
<option value="New Mexico">New Mexico</option> 
<option value="New York">New York</option> 
<option value="North Carolina">North Carolina</option> 
<option value="North Dakota">North Dakota</option> 
<option value="Ohio">Ohio</option> 
<option value="Oklahoma">Oklahoma</option> 
<option value="Oregon">Oregon</option> 
<option value="Pennsylvania">Pennsylvania</option> 
<option value="Rhode Island">Rhode Island</option> 
<option value="South Carolina">South Carolina</option> 
<option value="South Dakota">South Dakota</option> 
<option value="Tennessee">Tennessee</option> 
<option value="Texas">Texas</option> 
<option value="Utah">Utah</option> 
<option value="Vermont">Vermont</option> 
<option value="Virginia">Virginia</option> 
<option value="Washington">Washington</option> 
<option value="West Virginia">West Virginia</option> 
<option value="Wisconsin">Wisconsin</option> 
<option value="Wyoming">Wyoming</option>
</select>
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="zip">ZIP Code:</label>
    <input
      type="text"
      id="zip"
      name="zip"
      value={zip}
      onChange={(e) => setZip(e.target.value)}
      required
    />
  </div>

</div>
<hr />

<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Property Details</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
  <div  style={{ display: 'grid', gap: '1rem', width: '100%' }}>
    <textarea
      rows="10"
      id="propertyDescription"
      placeholder='E.g., A charming two-bedroom apartment with scenic views...'
      required
      value={content}
      onChange={(e) => setContent(e.target.value)}
    ></textarea>
  </div>
</div>


<button
type="submit"
disabled={!isSignedIn || !content || !selectedCollection || !address || !zip || !state || !city || !price  ||  isLoading}
style={{
cursor: !isSignedIn || !content || !selectedCollection || !address || !zip || !state || !city || !price || isLoading ?  'none' : 'pointer',
backgroundColor: !isSignedIn || !content || !selectedCollection || !address || !zip || !state || !city || !price || isLoading ? '#9e9e9e' : '#00a8ff',
color: !isSignedIn || !content || !selectedCollection  || !address || !zip || !state || !city || !price || isLoading ? 'grey' : '#fff',

}}
  
>
{isLoading ? <BeatLoader color='blue' /> : 'Submit'}
</button>
</form>
</div>
</>
);
}    