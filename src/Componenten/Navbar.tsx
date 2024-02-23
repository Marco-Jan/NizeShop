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
                <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#333', fontSize: '20px', fontWeight: '500' }}> {/* Ändere hier die Hintergrundfarbe zu Weiß und die Textfarbe zu einem dunklen Grau */}
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'inherit', marginLeft: '3em' }}> {/* Stelle sicher, dass die Farbe der Typografie ebenfalls angepasst ist, falls notwendig */}
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>NizeShop</Link>
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>Home</Link>
                            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>Shop</Link>
                            <CartIcon />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
