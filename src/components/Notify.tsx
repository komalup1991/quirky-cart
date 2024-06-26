import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: grey;
  color: white;
    font-size: 14px;
    font-weight: 500;
`;
const Notify = () => {
  return (
    <div>
        <Container>
            Free Shipping over $50. Discounts available for new customers only.
        </Container>
    </div>
  )
}

export default Notify