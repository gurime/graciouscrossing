import React from 'react'

export const Card = ({ title, imgSrc, content, buttonText}) => {
return (
<>
<div className="card">
<img src={imgSrc} alt="" />
<div>
<h2 className="card-title">{title}</h2>

<div>
<p className="card-content">{content}</p>
</div>
<button className='card-button'>
{buttonText}
</button>
</div>
</div>

</>
)
}