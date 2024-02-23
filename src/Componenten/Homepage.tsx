import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getProducts } from './handleProduct';
import { Product } from './handleProduct';

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

const ShopBtn = styled(Button)`
  background-color: #f50057;
`;

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts = await getProducts();
      const shuffledProducts = loadedProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
      setProducts(shuffledProducts);
    };

    fetchProducts().catch(error => console.error('Error fetching products:', error));
  }, []);

  // Funktion zum Hinzufügen zum Warenkorb (Dummy-Funktion)
  const handleAddToCart = (product: Product) => {
    console.log("Produkt hinzugefügt", product);
    // Hier würde die Logik zum Hinzufügen des Produkts zum Warenkorb implementiert
  };

  return (
    <>
      <HomepageTitle>"Entdecke den NizeShop: Deine Quelle für trendige Produkte und coole Gadgets!"</HomepageTitle>
      <CenteredContainer>
        <ShopBtn
          variant="contained"
          onClick={() => navigate('/shop')}
        >Shop</ShopBtn>
      </CenteredContainer>
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '10px' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#213547', textAlign: 'center', marginBottom: '20px' }}>
          Aktuelle Angebote
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={4} key={product.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ width: '80%', height: '200px', objectFit: 'contain', padding: '10px' }}
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <Button
                  sx={{ m: 1, backgroundColor: '#696969', color: 'white', '&:hover': { backgroundColor: '#505050' } }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  sx={{ m: 1, backgroundColor: '#557C55', color: 'white', '&:hover': { backgroundColor: '#355E35' } }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Produkt Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
