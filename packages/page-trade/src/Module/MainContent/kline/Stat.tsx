
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
  position: absolute;
  display: flex;
  font-size: 12px;
  top: 36px;
  left: 16px;
  color: #9ca8c1;
  padding-left: 0;
  li{
    list-style: none;
  }
  li:not(:first-of-type) {
    margin-left: 10px;
  }
`;

export default function ({ close, high, low, open, volume }: Candle): React.ReactElement<Candle> {
  return (
    <Wrapper>
      <li>O: {open}</li>
      <li>H: {high}</li>
      <li>L: {low}</li>
      <li>C: {close}</li>
      <li>V: {volume}</li>
    </Wrapper>
  );
}
