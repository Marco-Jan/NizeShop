import { useCart } from './CartContext';
import { Card, CardContent, Typography, CardActions, IconButton, Grid, Box, Button, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom';



export default function ShoppingCart() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleIncreaseQuantity = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', data: { id } });
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', data: { id } });
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', data: { id } });
  };

  const totalPrice = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log(state.cart, 'state.cart');


  return (
    <Box sx={{ flexGrow: 1, m: 3, color: '#213547' }}>
      <Typography variant="h4" gutterBottom>
        Warenkorb
      </Typography>
      <Grid container spacing={4} >
        <Grid item xs={12} md={8} sx={{ p: 3 }}>
          {state.cart.length > 0 ? (
            state.cart.map((item) => (
              <Card key={item.id} sx={{ mb: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '34px' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 150, objectFit: 'contain' }}
                  image={item.image}
                  alt={item.title}
                />
                <CardContent sx={{ flex: '1 1 auto' }}>
                  <Typography variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    Preis: ${item.price.toFixed(2)}
                  </Typography>
                  <Typography color="text.secondary">
                    Menge: {item.quantity}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton onClick={() => handleIncreaseQuantity(item.id)} aria-label="increase quantity">
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDecreaseQuantity(item.id)} aria-label="decrease quantity">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveFromCart(item.id)} aria-label="remove from cart">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography>Dein Warenkorb ist leer.</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4} sx={{ bgcolor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start', padding: 0 }}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back to shop</Button>
              </CardActions>
              <Typography variant="h4">Preisauflistung</Typography>
              {state.cart.map((item) => (
                <Typography key={item.id} sx={{ margin: '10px' }}>
                  {item.title}: ${item.price.toFixed(2)} x {item.quantity}
                </Typography>
              ))}
              <Typography variant="h5" sx={{ mt: 2 }}>
                Gesamtpreis: ${totalPrice.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary">
                Zur Kassa
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
