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

  const shuffleArray = (loadedProducts: Product[]) => {
    const newArray = [...loadedProducts];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const loadedProducts = await getProducts();
        const shuffledProducts = shuffleArray(loadedProducts).slice(0, 3);
        console.log(shuffledProducts, 'shuffledProducts');
        setProducts(shuffledProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
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
          marginBottom: '2em'
          }}
          onClick={() => navigate('/shop')}
        >
          Shop
        </Button>
      </CenteredContainer>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
