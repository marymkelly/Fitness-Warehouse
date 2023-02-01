import React from 'react';

// Importing Review Function
import Review from './Review';


/*
==================
Review App Section 
==================
*/


function App() {
return (
<main className="appArea">
    <section className='container2 graphic3'>
    <div className='title2 improv'>
        <h2>Our Reviews</h2>
        <div className='underline2'></div>
    </div>

    {/* Review App */}
    <Review />
    </section>
</main>
);
}

export default App;
