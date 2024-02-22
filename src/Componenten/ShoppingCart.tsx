// ProductCard.tsx
import { Button } from '@mui/material';
import { Product as ProductType } from './handleProduct'; // Importieren Sie den Typ
import { useCart } from './CartContext';

interface ProductCartProps {
  product: ProductType;
}

const ProductCart = ({ product }: ProductCartProps) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1, title: product.title!, price: Number(product.price) } });
  };

  return (
    <div>
      <img src={product.image} alt={product.title} style={{ maxWidth: '100%' }} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Button onClick={addToCart}>Add to cart</Button>
    </div>
  );
};

export default ProductCart;
