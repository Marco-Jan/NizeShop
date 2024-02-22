import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product as ProductType} from './handleProduct';

export default function Product() {
  const { productId } = useParams<{productId: string}>();
  const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(false);

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
  
    fetchProduct();
  }, [productId]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!product) {
    return <div>Produkt nicht gefunden.</div>;
  }
  
  return (
    <div>
      <img src={product.image} alt={product?.title} style={{ maxWidth: '100%' }} />
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <p>${product?.price}</p>
      <button type="button">Add to cart</button>
    </div>
  );
  
}
