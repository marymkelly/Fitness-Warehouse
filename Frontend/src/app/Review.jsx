import React, { useState } from 'react';

// Importing People Data
import people from './data';


/*
===============
Review Section 
===============
*/


const Review = () => {

// Track's Which Person's Review Is Currently Being Displayed
const [index, setIndex] = useState(0);

// Destructures Properties Of The Person Object In People data array At Current Index
const { name, job, image, text } = people[index];

// Takes Number As Parameter 
const checkNumber = (number) => {
if (number > people.length - 1) {
    return 0;
}
if (number < 0) {
    return people.length - 1;
}
return number;
};

// Callback Function Passed As onClick Prop To The "next" Button
const nextPerson = () => {
setIndex((index) => {
    let newIndex = index + 1;
    return checkNumber(newIndex);
});
};

// Callback Function Passed As onClick Prop To The "prev" Button
const prevPerson = () => {
setIndex((index) => {
    let newIndex = index - 1;
    return checkNumber(newIndex);
});
};


return (
<article className='review2 previewShadow'>

    {/* Person Image */}
    <div className='img-container2'>
    <img src={image} alt={name} className='person-img2' />
    </div>

    {/* Person Information */}
    <p className='author'>{name}</p>
    <p className='job2'>{job}</p>
    <p className='info2'>{text}</p>
    <div className='button-container'>

    {/* Previous Person Button */}
    <button className='prev-btn2' onClick={prevPerson}>
        {<i className="fa-sharp fa-solid fa-arrow-left"></i>}
    </button>

    {/* Next Person Button */}
    <button className='next-btn2' onClick={nextPerson}>
        {<i className="fa-sharp fa-solid fa-arrow-right"></i>}
    </button>
    </div>
</article>
);
};

export default Review;
