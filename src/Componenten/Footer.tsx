import { Box, Container, Grid, Link, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'rgba(255,255,255,0.4)', 
        color: '#213547', 
        mt: '50px', 
        py: 3,
        bottom: 0, 
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              NizeShop
            </Typography>
            <Typography>
              Die beste Auswahl an Produkten für dich. Besuche uns auf unseren sozialen Netzwerken.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Kontakt
            </Typography>
            <Typography>
              E-Mail: office@nizeshop.at
            </Typography>
            <Typography>
              Telefon: +123 456 7890
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Folge uns
            </Typography>
            <Box>
              <Link href="https://www.instagram.com" color="inherit" target='_blank'>
                <InstagramIcon sx={{ mr: 1 }} />
              </Link>
              <Link href="https://www.facebook.com" color="inherit" target='_blank'>
                <FacebookIcon sx={{ mx: 1 }} />
              </Link>
              <Link href="https://www.twitter.com" color="inherit" target='_blank'>
                <TwitterIcon sx={{ ml: 1 }} />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
