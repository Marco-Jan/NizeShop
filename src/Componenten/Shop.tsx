import styled from 'styled-components';

const CenteredShopTitle = styled.h1`
  text-align: center;
  color: blue;
`;

export default function Home() {
  return <CenteredShopTitle>Willkommen im Shop</CenteredShopTitle>;
}
