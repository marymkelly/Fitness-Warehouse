// Navbar & Footer
import { Navbar, Footer } from "../components";

import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import Card from '@mui/material/Card';


/*
=============
Sign Up Page 
=============
*/


const Signup = () => {
const navigate = useNavigate();
const location = useLocation();

// As explained in the Login page.
const { emailPasswordSignup } = useContext(UserContext);
const [form, setForm] = useState({
email: "",
password: ""
});

// As explained in the Login page.
const onFormInputChange = (event) => {
const { name, value } = event.target;
setForm({ ...form, [name]: value });
};


// As explained in the Login page.
const redirectNow = () => {
const redirectTo = location.search.replace("?redirectTo=", "");
navigate(redirectTo ? redirectTo : "/Home2");
}

// As explained in the Login page.
const onSubmit = async () => {
try {
    const user = await emailPasswordSignup(form.email, form.password);
    if (user) {
    redirectNow();
    }
} catch (error) {
    alert(error);
}
};

return <>

        {/* Navbar */}
        <Navbar />

        {/* Header */}
        <h1 className="text-center mt-5 improv" data-aos="zoom-out-up" >Signup</h1>

        {/* Sign Up Card */}
        <Card className="card shadow-lg" sx={{ maxWidth: 600 }} style={{display: 'block', margin: 'auto', marginBottom: '5rem', marginTop: '5rem' }}>
            
            {/* Form */}
            <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", marginTop: '3rem', marginBottom: '3rem' }}>
                
                {/* Email */}
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    name="email"
                    value={form.email}
                    onInput={onFormInputChange}
                    style={{ marginBottom: "1rem" }}
                />
                
                {/* Password */}
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={form.password}
                    onInput={onFormInputChange}
                    style={{ marginBottom: "1rem" }}
                />
                
                {/* Button */}
                <div className="graphic2 btn-2" style={{ display: 'flex'}}>
                    <Button className="mx-2 login-button" style={{fontWeight: 'bold'}} onClick={onSubmit}>
                        Signup
                    </Button>
                </div>

                {/* Redirect To Login */}
                <div className="improv3 mt-3">
                <p className="improv4">Have an account already? <Link to="/login" className="improv4">Login</Link></p>
                </div>

            </form>

        </Card>

        {/* Footer */}
        <Footer />
    </>
}

export default Signup;