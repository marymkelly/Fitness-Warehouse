import React, { useState, useEffect } from "react";
import axios from 'axios';
import ShowCart from "../pages/Cart"

/*
===================
Check Out Feature
===================
*/


// Component Responsible For Displaying Product Information Such As Name, Image, And Price
const ProductDisplay = () => (
<section>
<div className="product">
    <img
    src="https://i.imgur.com/EHyR2nP.png"
    alt="The cover of Stubborn Attachments"
    />
    <div className="description">
    <h3>Stubborn Attachments</h3>
    <h5>$20.00</h5>
    </div>
</div>
<div>

    {/* Checkout Button Sends Post Request To Server. Request Sent To Enpoint Using Axios */}
    <button onClick={ () => {
        axios
        .post(`http://localhost:3001/CheckoutFinal`, {
    })

    // Server Responds With Checkout Session URL Which Is Assigned To Window Location Property
    // Then Rdirects User To Checkout Session Hosted By Stripe, Where User Enter's Payment Information
    .then((res) => {
        console.log('a')
        if (res.data.url) {
            window.location.href = res.data.url
        }
    })
    .catch((err) => console.log(err.message));
    }
    } >
    Checkout
    </button>
</div>
</section>
);

// Displays Messages Generated During Checkout Process
const Message = ({ message }) => (
<section>
<p>{message}Hello</p>
</section>
);

export default function App() {
const [message, setMessage] = useState("");

useEffect(() => {
// Check To See If This Is A Redirect Back From Checkout
const query = new URLSearchParams(window.location.search);

if (query.get("success")) {
    setMessage("Order placed! You will receive an email confirmation.");
}

if (query.get("canceled")) {
    setMessage(
    "Order canceled -- continue to shop around and checkout when you're ready."
    );
}
}, []);

return message ? (
<Message message={message} />
) : (
<ProductDisplay />
);
}