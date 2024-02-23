import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function Navbar() {
    return (
        <>
            <Box className="content" sx={{ flexGrow: 1 }}>
                <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#333', fontSize: '1.2em', fontWeight: '500' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'inherit', display: 'flex', alignItems: 'center', marginLeft: '3em' }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>NizeShop</Link>
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px', display: 'flex', alignItems: 'center' }}>Home</Link>
                            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px', display: 'flex', alignItems: 'center' }}>Shop</Link>
                            <CartIcon />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
