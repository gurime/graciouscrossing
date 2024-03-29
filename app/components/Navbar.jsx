'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Navlogo from '../img/gracious.png'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { auth } from '../Config/firebase'
import { getArticle } from './HeroFormApi/api'
import Footer from './Footer'
export default function Navbar() {
const router = useRouter()
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [isOverlayActive, setIsOverlayActive] = useState(false);
const [isFooterVisible, setIsFooterVisible] = useState(false);
const [isSignedIn, setIsSignedIn] = useState(false);
const [names, setNames] = useState([]);
const [ isAdminUser,setIsAdminUser] = useState([])

        

useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(async (user) => {
setIsSignedIn(!!user);

if (user) {
    try {
      // Fetch user data from Firestore
      const userData = await getUserData(user.uid);
      setNames([userData.firstName, userData.lastName]);

      // Check if the user is from the adminusers collection
      const isAdminUser = userData.isAdmin; // Assuming there's an 'isAdmin' field in your user data
      setIsAdminUser(isAdminUser);

    } catch (error) {
    }
  }
});


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
console.error('Error fetching user data:', error.message);
throw error;
}
};

}, []);

  


const toggleFooter = () => {
setIsFooterVisible(!isFooterVisible);
};

const handleLogout = async () => {
try {
await auth.signOut();
router.push('/pages/Login')
} catch (error) {
}
};
        
return (
<>
<nav className='nav'>
<div className="navlogo">
<Image onClick={() => router.push('/')} src={Navlogo} height={36} alt='...' />
</div>
<ul className="navlinks">
{isSignedIn && !isAdminUser? (
<Link href='#!' style={{
    cursor:'none'
}}>
{names.length === 2 && (
<>
<span className="sm-name" >{names[0]}</span>
<span className="sm-name">{names[1]}</span>

</>
)}
</Link>
) : (

<div className="commentreg-box">
<span
style={{
margin:'10px',
color:'#fff',
cursor:'pointer'

}}
onClick={() => router.push('/pages/Login')}>
Login
</span>
<span
style={{
margin: '10px',
color:'#fff',
cursor:'pointer'
}}
onClick={() => router.push('/pages/Register')}>
Register
</span>
</div>
)}
<li><Link href="/">Home</Link></li>
<Link href='#!' onClick={toggleFooter}>More:</Link>


{isSignedIn && !isAdminUser ? (
<button
type="submit"
onClick={handleLogout}
>
Log out
</button>  
) : (
<div></div>
)}
</ul>
</nav>

{/* footer dropdown */}
<div style={{position:'relative',width:'100%'}}>
<div style={{position:'absolute',width:'100%',zIndex:'1'}}>
{isFooterVisible && <Footer />}
</div>
</div>
{/* footer dropdown */}
</>
)
}
