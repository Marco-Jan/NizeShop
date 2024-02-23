import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getProducts } from './handleProduct';
import { Product } from './handleProduct';
import { useCart } from './CartContext';



const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const HomepageTitle = styled.h1`
  text-align: center;
  position: relative;
  margin-top: 80px;
  color: #213547;
  animation: ${slideIn} 2s ease-out;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; 
`;



export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts = await getProducts();
      const shuffledProducts = loadedProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
      setProducts(shuffledProducts);
    };

    fetchProducts().catch(error => console.error('Error fetching products:', error));
  }, []);


  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', data: { id: product.id, title: product.title ?? '', price: product.price, quantity: 1, image: product.image! } });
  };

  const handleViewDetails = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <HomepageTitle>"Entdecke den NizeShop: Deine Quelle für trendige Produkte und coole Gadgets!"</HomepageTitle>
      <CenteredContainer>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            '&:hover': {
              backgroundColor: '#b3cde0',
            },
          }}
          onClick={() => navigate('/shop')}
        >
          Shop
        </Button>
      </CenteredContainer>
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '10px', backgroundColor: 'rgba(255,255,255,0.4)' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#213547', textAlign: 'center', marginBottom: '20px' }}>
          Aktuelle Angebote
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={4} key={product.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ width: '80%', height: '200px', objectFit: 'contain', padding: '30px', cursor: 'pointer' }}
                  image={product.image}
                  alt={product.title}
                  onClick={() => handleViewDetails(product.id)}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
                  <Button
                    sx={{ m: 1, color: 'white', '&:hover': { backgroundColor: '#b3cde0' } }}
                    onClick={() => handleAddToCart(product)}
                    variant='contained'
                    color='secondary'
                  >
                    Add to Cart
                  </Button>

                  {/* <Button
                  sx={{ m: 1, backgroundColor: '#557C55', color: 'white', '&:hover': { backgroundColor: '#355E35' } }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Produkt Details
                </Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
