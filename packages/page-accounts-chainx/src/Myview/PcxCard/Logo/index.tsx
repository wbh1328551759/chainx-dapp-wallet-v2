
import React from 'react';
import styled from 'styled-components';
import logo from './chainx.svg';
import infoIcon from '../Logo/info.svg';
import Label from '@polkadot/app-trade/src/Module/MainContent/TradeForm/components/Label';

const Wrapper = styled.div`
  display: flex;
  max-height: 50px;
  img {
    margin-right: 20px;
    width: 50px;
  }

  section.info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Title = styled.h6`
  margin: 0;
  opacity: 0.72;
  font-size: 18px;
  color: #000000;
  line-height: 28px;
  text-align: left;
`;

const Desc = styled.span`
  position: relative;
  left: -8px;
  margin: 0;
  opacity: 0.8;
  font-size: 14px;
  color: #000000;

  background: #f6c94a;
  border-radius: 10px;
  padding: 2px 8px;
`;

export default function () {
  return (
    <Wrapper>
      <img alt='chainx logo'
        src={logo} />
      <section className='info'>
        <Title>PCX</Title>
        <Desc>Polkadot ChainX</Desc>
      </section>
    </Wrapper>
  );
}
