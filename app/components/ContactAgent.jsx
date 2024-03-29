'use client'
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function ContactAgent({post}) {
const [names, setNames] = useState('');
const [phone, setPhone] = useState('');
const [initialContent, setInitialContent] = useState(`I'm interested in ${post.address || ''}, ${post.city || ''}, ${post.state?.slice(0, 2) || ''}, ${post.zip || ''}`);

const [content, setContent] = useState(initialContent);


const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);
const router = useRouter();
const openModal = () => {
setIsModalOpen(true);
setContent(initialContent);

};
    
const closeModal = () => {
setIsModalOpen(false);
setContent('')
setNames('');
window.scrollTo(0,500)
};

const handleScheduleTour = async (e) => {
e.preventDefault();
try {
const auth = getAuth();
const user = auth.currentUser;
setIsLoading(true);
const db = getFirestore();
const docRef = await addDoc(collection(db, 'contactagent'), {
timestamp: new Date(),
userId: user.uid,
userEmail: user.email,
names:names,
content:content,
phone:phone
});
setNames('');
setPhone('');
setSuccessMessage('Thank You')



//router.push('/pages/ScheduleTour')
setTimeout(() => {
}, 3000);


setIsModalOpen(false)
} catch (error) {
                
setErrorMessage('Error submitting form. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
} finally {
}
};
    
return (
<>
<button className='openmodalcontact' style={{
padding:'1rem',
outline:'none',
border:'1px solid #0059e0',
fontSize:'16px',
cursor:'pointer',
lineHeight:'24px',
color:'#0059e0',
backgroundColor:'#fff'
}}
onClick={openModal}>Contact Property</button>


{isModalOpen && (
<div
style={{
position: 'fixed',
top: '0',
left: '0',
width: '100%',
height: '100%',
background: 'rgba(0, 0, 0, 0.5)',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}}
>
<div
className="modal-content"
style={{
background: '#fff',
padding: '2rem',
animation: 'fadeIn 0.5s', 


borderRadius: '8px',}}>
{/* Your modal content goes here */}


<div className='schedulecontact'>
              
        <h4 style={{fontSize:'20px',textAlign:'center'}}>Contact Property</h4>


<div className='sm-schedulecontact' style={{marginLeft:'10px',maxWidth:'90%'}}>
  <input
type="text"
style={{
  marginBottom: '1rem',
  padding: '1rem',
  borderRadius: '5px',
  border: '1px solid #6d1ffa',
  outline: 'none',
  textIndent: '7px',
  fontSize:'14px',
  width:'100%'
}}
placeholder='Full Name'
value={names} onChange={(e) => setNames(e.target.value)} required/>
  <input
type="phone "

style={{
  marginBottom: '1rem',
  padding: '1rem',
  borderRadius: '5px',
  border: '1px solid #6d1ffa',
  outline: 'none',
  textIndent: '7px',
  fontSize:'14px',
  width:'100%'
}}
placeholder='Phone Number'
pattern='[0-9]*'
value={phone} onChange={(e) => setPhone(e.target.value)} required/>




         </div>
<div className='sm-schedulecontacttextarea' style={{marginLeft:'10px',maxWidth:'90%'}}>        


<textarea
className='sc-contacttextarea'
style={{
padding:'1rem',
resize:'none',
marginBottom:'1rem',
outline:'none',
fontSize:'14px',
letterSpacing:'2px',
width:'100%'
}}
  rows="2"
  required
  value={content}

  onChange={(e) => setContent(e.target.value)}
></textarea>
</div>
 


<button 
disabled={!names || !phone || !content.trim() || isLoading}

style={{marginBottom:'1rem',
cursor: !names || !phone || !content || isLoading ?  'none' : 'pointer',
backgroundColor: !names || !phone || !content || isLoading ? '#9e9e9e' : '#00a8ff',
color: !names || !phone  || !content || isLoading ? 'grey' : '#fff',
}} className='edit-btn' onClick={handleScheduleTour}>Contact</button>

<button className='delete-btn' onClick={closeModal}>Close Modal</button>
</div>

{successMessage && <p>{successMessage}</p>}

</div>
</div>
)}
</>
)
}
