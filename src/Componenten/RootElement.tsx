import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#b3cde0',
        },
        secondary: {
            main: '#f2b2a8',
        },
        background: {
            default: '#f3e9dd',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        
    },
});




function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <Navbar />
                <Outlet />
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default App;
