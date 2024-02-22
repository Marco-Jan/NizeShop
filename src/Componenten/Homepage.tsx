import { Button } from '@mui/material';
import styled, { keyframes } from 'styled-components';

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
  animation: ${slideIn} 2s ease-out;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; 
`;

const ShopBtn = styled(Button)`
  background-color: #f50057;`; 

export default function Home() {
    return (
      <>
        <HomepageTitle>Willkommen auf der Homepage</HomepageTitle>
        <CenteredContainer>
          <ShopBtn
          variant="contained"
         
          >Shop</ShopBtn>
        </CenteredContainer>
      </>
    );
}
