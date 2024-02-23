
import { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Product, getProducts } from './handleProduct';
import { useCart } from './CartContext'; 



export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts = await getProducts();
      setProducts(loadedProducts);
    };

    fetchProducts().catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id: product.id, title: product.title!, price: product.price, quantity: 1 } });   
     console.log('Product added to cart:', product);
    
  };

  return (
    <Grid container spacing={3} sx={{ maxWidth: '1200px', margin: 'auto', padding: '10px' }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px', margin: 'auto', height: '100%' }}>
            <CardMedia
              component="img"
              sx={{ width: '80%', height: '200px', objectFit: 'contain', padding: '10px' }}
              image={product.image}
              alt={product.title}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography gutterBottom variant="h6" component="h2" sx={{ fontSize: '1.25rem' }}>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                ${product.price}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
              <Button
                sx={{ backgroundColor: '#696969', color: 'white', '&:hover': { backgroundColor: '#505050' } }}
                onClick={() => handleAddToCart({ ...product, price: product.price })}
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
