import { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import { Product, getProducts } from './handleProduct';
import { useCart } from './CartContext';
import { useNavigate, useLocation, useSubmit, Form } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; 
  background-color: rgba(255,255,255,0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    input {
      padding: 10px;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #ff6f61;
    color: white;
    border-radius: 5px;
    &:hover {
      background-color: #ff402c;
    }
  }
`;

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();
  const submit = useSubmit();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async (search = '') => {
      const loadedProducts = await getProducts(search);
      setProducts(loadedProducts);
    };

    fetchProducts(searchTerm);
  }, [searchTerm]);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', data: { id: product.id, title: product.title ?? '', price: product.price, quantity: 1, image: product.image! } });
  };

  const handleSearch = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    submit(formData, { method: 'get', action: '/shop' });
  };

  const handleImageClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <StyledContainer>
        <Form onSubmit={handleSearch}>
          <StyledTextField name="search" label="Produkt suchen" variant="outlined" defaultValue={searchTerm} />
          <StyledButton variant='contained' color='secondary' type="submit">Suchen</StyledButton>
        </Form>
      </StyledContainer>

      <Grid container spacing={3} sx={{ maxWidth: '1200px', margin: 'auto', padding: '5px' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px', margin: 'auto', height: '100%' }}>
              <CardMedia
                component="img"
                sx={{ width: '80%', height: '200px', objectFit: 'contain', padding: '10px', cursor: 'pointer' }}
                image={product.image}
                alt={product.title}
                onClick={() => handleImageClick(product)}
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
                  sx={{ color: 'white', '&:hover': { backgroundColor: '#b3cde0' } }}
                  onClick={() => handleAddToCart(product)}
                  variant='contained'
                  color='secondary'
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
