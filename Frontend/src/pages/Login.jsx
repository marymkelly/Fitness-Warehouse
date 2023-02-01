// Navbar & Footer
import { Navbar, Footer } from "../components";

import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { useDispatch } from 'react-redux'
import Card from '@mui/material/Card';


/*
==========
Login Page 
==========
*/


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const setUser = (user, isLoggedIn) => {
    return {
    type: 'SET_USER',
    payload: {
      email: user.email,
      isLoggedIn
    }
  }
}

// We are consuming our user-management context to
// get & set the user details here
const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

// We are using React's "useState" hook to keep track
//  of the form values.
const [form, setForm] = useState({
  email: "",
  password: "",
  firstName: "",
  lastName: ""
});

// This function will be called whenever the user edits the form.
const onFormInputChange = (event) => {
  const { name, value } = event.target;
  setForm({ ...form, [name]: value });
};

// This function will redirect the user to the
// appropriate page once the authentication is done.
const redirectNow = () => {
  const redirectTo = location.search.replace("?redirectTo=", "");
  navigate(redirectTo ? redirectTo : "/Home2");
}

// Once a user logs in to our app, we don’t want to ask them for their
// credentials again every time the user refreshes or revisits our app, 
// so we are checking if the user is already logged in and
// if so we are redirecting the user to the home page.
// Otherwise we will do nothing and let the user to login.
const loadUser = async () => {
  if (!user) {
    const fetchedUser = await fetchUser();
    if (fetchedUser) {
      // Redirecting them once fetched.
      redirectNow();
    }
  }
}

// This useEffect will run only once when the component is mounted.
// Hence this is helping us in verifying whether the user is already logged in
// or not.
useEffect(() => {
  loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// This function gets fired when the user clicks on the "Login" button.
const onSubmit = async (event) => {
  const user = await emailPasswordLogin(form.email, form.password);
  if (user) {
  dispatch(setUser(user, true));
  redirectNow();
}
  try {
    // Here we are passing user details to our emailPasswordLogin
    // function that we imported from our realm/authentication.js
    // to validate the user credentials and log in the user into our App.
    const user = await emailPasswordLogin(form.email, form.password);
    if (user) {
      redirectNow();
    }
  } catch (error) {
      if (error.statusCode === 401) {
        alert("Invalid username/password. Try again!");
    } else {
        alert(error);
    }

  }
};


return <>

    {/* Navbar */}
    <Navbar />

    {/* Header */}
    <h1 className="text-center mt-5 improv" data-aos="zoom-out-up" >Log In</h1>

    {/* Login Body */}
    <Card className="card3 shadow-lg " sx={{ maxWidth: 600 }} style={{display: 'block', margin: 'auto', marginBottom: '5rem', marginTop: '5rem' }}>

      {/* Login Form */}
      <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", marginTop: '3rem', marginBottom: '3rem' }}>
        
        {/* Email */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          name="email"
          value={form.email}
          onChange={onFormInputChange}
          style={{ marginBottom: "1rem" }}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={form.password}
          onChange={onFormInputChange}
          style={{ marginBottom: "1rem" }}
        />

        {/* Button */}
        <div className="graphic2 btn-2" style={{ display: 'flex'}}>
          <Button className="mx-2 textCenter login-button" style={{ fontWeight: 'bold' }} onClick={onSubmit}>
            Login
          </Button>
        </div>

        {/* Redirect to Signup */}
        <div className="improv3 mt-3">
          <p className="improv4">Don't have an account? <Link to="/signup" className="improv4">Signup</Link></p>
        </div>
      </form>
    </Card>

    {/* Footer */}
    <Footer />
  </>
}

export default Login;