import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product as ProductType } from './handleProduct';
import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', data: { ...product, title: product.title ?? '', image: product.image ?? '' } });
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Produkt nicht gefunden.</div>;
  }

  return (
    <Grid container spacing={2} sx={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ height: 'auto', width: '50%', objectFit: 'contain', margin: 'auto', padding: '2.4em' }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: '#213547' }}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5">${product.price}</Typography>
          <Button variant="contained" sx={{margin:'30px'}} onClick={handleAddToCart}>Add to cart</Button>
          <Button variant="contained" sx={{margin:'30px'}} onClick={() => navigate(-1)}>Back to shop</Button>
        </Box>
      </Grid>
    </Grid>
  );
}
