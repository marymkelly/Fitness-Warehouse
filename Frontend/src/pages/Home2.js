// Footer & Navbar
import { Footer, Navbar } from "../components";

// Imports Info About User
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';

// Material UI Button & Card
import { Button, CardActionArea } from '@mui/material'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// Material UI List
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Material Icon's
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';

// Material UI Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


/*
===============
User Home Page 
===============
*/


export default function Home2() {
const { logOutUser } = useContext(UserContext);
const { user } = useContext(UserContext);
console.log(user); 



// This function is called when the user clicks the "Logout" button.
const logOut = async () => {
try {
    // Calling the logOutUser function from the user context.
    const loggedOut = await logOutUser();
    // Now we will refresh the page, and the user will be logged out and
    // redirected to the login page because of the <PrivateRoute /> component.
    if (loggedOut) {
    window.location.reload(true);
    }
} catch (error) {
    alert(error)
}
}

return (
<>
    {/* <Navbar /> */}

        {/* Header */}
        <h2 className="text-center mt-5 improv m-3" >Hello</h2>
        <Card className="card shadow-lg improv4" sx={{ maxWidth: 600 }} style={{display: 'block', margin: 'auto', marginBottom: '3rem' }}>
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="h5" className="improv4" component="div">
                    Account Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <BadgeIcon className="improv4"  />
                        </ListItemIcon>

                        {/* User Name */}
                        <ListItemText primary={user._profile.data.firstname} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <EmailIcon className="improv4" />
                        </ListItemIcon>

                        {/* User Email */}
                        <ListItemText primary={user._profile.data.email} className="improv4"  />
                        </ListItemButton>
                    </ListItem>
                </List>

                {/* Purchase Log Section */}
                <Typography gutterBottom variant="h6" className="improv4"  component="div">
                    Purchase History
                </Typography>
                <TableContainer className="card shadow graphic3" component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table ">
                        
                        {/* Row 1 */}
                        <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Date Sold</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                        
                        {/* Row 2 */}
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <TableCell component="th" scope="row">Mats
                            </TableCell>
                            <TableCell align="right">2</TableCell>
                            <TableCell align="right">$500</TableCell>
                            <TableCell align="right">1/12/23</TableCell>
                            <TableCell align="right">More</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>


                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

        {/* Log Out Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="graphic2 btn-1 mx-2 mb-5" style={{color:'black', fontWeight: 'bold', width: '19.5vw'}} onClick={logOut}>Logout</Button>
        </div>
    {/* <Footer /> */}
</>
)
}