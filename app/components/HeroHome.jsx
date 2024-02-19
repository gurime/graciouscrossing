'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import searchimg from '../img/search_icon.png'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { collectionRoutes, getArticle } from './HeroFormApi/api'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Config/firebase'
export default function HeroHome() {
const [forceRender, setForceRender] = useState(false);
const [loading, setLoading] = useState(false);
const [isSignedIn, setIsSignedIn] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [isOverlayActive, setIsOverlayActive] = useState(false);
const router = useRouter()
const overlayStyle = {
position: 'fixed',
top: 0,
left: 0,
width:'100%',
height: '100%',
background: '#000',
opacity:'.6',
display: isOverlayActive ? 'block' : 'none',
pointerEvents: 'none',
};

useEffect(() => {
const handleDocumentClick = (e) => {
const isClickOutsideSearch = !e.target.closest('.search-container');
if (isClickOutsideSearch) {
setIsOverlayActive(false);
setSearchResults([]);
setSearchTerm(''); // Clear the search input
}
};
document.body.addEventListener('click', handleDocumentClick);
const unsubscribe = onAuthStateChanged(auth, (user) => {
setForceRender((prev) => !prev); // Force re-render
setIsSignedIn(!!user);    });
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

// Assuming you have an unsubscribe function
return () => {
document.body.removeEventListener('click', handleDocumentClick);
// Make sure to define the unsubscribe function
// unsubscribe();
};
}, [searchTerm, isOverlayActive]);

const handleSearch = async () => {
// Assuming getArticle is a defined function
const results = await getArticle(searchTerm);
setSearchResults(results);
};

useEffect(() => {
handleSearch();
}, [searchTerm]);

const getLink = (collection, id) => {
const route = collectionRoutes[collection];
return route ? `${route}/${id}` : '/';
};
return (
<>
<div className="hero">
<h1>Welcome to Gracious Crossing </h1>
<h2 style={{color:'#fff'}}>We will find you the perfect home</h2>
<div style={overlayStyle}></div>

<form className='heroform' onSubmit={handleSearch} >
<input placeholder="Find your next destination"
type="type"
spellCheck="false"
dir="auto"
tabIndex={0}
value={searchTerm}
onChange={(e) => {
setSearchTerm(e.target.value);
setIsOverlayActive(e.target.value.trim().length > 0);
}}/>

{searchResults.length > 0 && searchTerm && !loading && (
<div className="search-results-container">
{searchResults.slice(0,10).map((result) => (
<div key={result.id} className="search-result-item">
<Link key={result.id} href={getLink(result.collection, result.id)}>
<p>{result.title} | {result.address}</p>

</Link>
</div>
))}
</div>
)}

<Image style={{transform:'translate(-40px)'}} src={searchimg} width={30} alt='...'  />
</form>
</div>


</>
)
}
