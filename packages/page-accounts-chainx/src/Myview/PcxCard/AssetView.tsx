import React from 'react';
import styled, { css } from 'styled-components';
import BN from 'bn.js'
import { FormatBalance } from '@polkadot/react-query';

const Title = styled.h6`
  margin: 0;
  opacity: 0.32;
  font-size: 14px;
  color: #000000;
  line-height: 20px;
`;

const Value = styled.div`
  margin: 4px 0 0;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  font-weight: 600;

  &.bold{
    font-size: 24px;
    line-height: 36px;
  }
`;

type Props = {
  title: string,
  bold?: any,
  value: BN
}

export default function ({ bold, title, value }: Props): React.ReactElement<Props> {
  return (
    <div>
      <Title>{title}</Title>
      <Value className={bold ? 'bold' : ''}>
        {/* {props.value} */}

        <FormatBalance
          className='result'
          value={value}
        />
      </Value>
    </div>
  );
}
