
import React from 'react';
import Xbtc from './XbtcCard';
import styled from 'styled-components';
import MiningChart from '@polkadot/app-accounts-chainx/Myview/Assets/components/MiningRevenueChart/MiningChart';

const Wrapper = styled.section`
  display:flex;
  & > div {
    margin-top: 16px;
    display: flex;

    &.first-line {
      width: 70%;
      & > section {
        width: 100%;
        &:not(:first-of-type) {
          margin-left: 16px;
        }
      }
    }

    &.second-line {
      & > section {
        width: calc(38% - 40px);
      }
    }
  }
`;

export default function (): React.ReactElement {
  return (
    <Wrapper>
      <div className='first-line'>
        <Xbtc />
      </div>
      <MiningChart />

    </Wrapper>
  );
}
