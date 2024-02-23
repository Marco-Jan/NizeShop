import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useCart } from './CartContext'; 
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const { state } = useCart();
  const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  if (totalQuantity === 0) {
    return null; 
  }

  return (
    <IconButton color="inherit">
      <Badge badgeContent={totalQuantity} color="secondary">
        <ShoppingCartIcon style={{ color: '#213547', fontSize: 34 }}
        onClick={() => navigate('/cart')}
        />
      </Badge>
    </IconButton>
  );
}

export default CartIcon;
