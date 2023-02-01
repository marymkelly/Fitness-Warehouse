
import React, { useState, useEffect } from 'react';


// Check If Theme Stored In Local Storage
// If Yes Then Sets To That Theme
// Default State Is Light Mode
const getStorageTheme = () => {
let theme = 'light-theme';
if (localStorage.getItem('theme')) {
theme = localStorage.getItem('theme');
}
return theme;
};


/*
================
Light/Dark Mode
================
*/


function Color({ toggleLogo }) {
const [theme, setTheme] = useState(getStorageTheme());
const [isDarkMode, setIsDarkMode] = useState(false);
const [logoSource, setLogoSource] = useState("./assets/NewLogo2.jpg"); // new state variable for logo source


const toggleMode = () => {
setIsDarkMode(!isDarkMode);
if (isDarkMode) {
    setTheme("light-theme");
    setLogoSource("./assets/NewLogo.jpg");
    toggleLogo();
} else {
    setTheme("dark-theme");
    setLogoSource("./assets/NewLogo2.jpg");
    toggleLogo();
}
}

useEffect(() => {
document.documentElement.className = theme;
localStorage.setItem('theme', theme);
}, [theme]);

return (
    // Toggle Button Switch Between Light/Dark Mode
    <button onClick={toggleMode} className="graphic2 btn-1" style={{width: '3.3rem', lineHeight: '52px', marginRight: '0.5rem'}}>
        {isDarkMode ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
    </button>
);
}

export default Color;