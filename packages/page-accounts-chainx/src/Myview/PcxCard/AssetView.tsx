import React from 'react';
import styled from 'styled-components';
import { FormatBalance } from '@polkadot/react-components-chainx';
import {useApi} from '@polkadot/react-hooks';
import {toPrecision} from '@polkadot/app-accounts-chainx/Myview/toPrecision';
import BigNumber from 'bignumber.js';

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
  value: number
}

const LoadingValue = styled.div`
  display: inline-block;
  vertical-align: baseline;
  white-space: nowrap;
  > .ui--FormatBalance-postfix {
    vertical-align: baseline;
  }
  >.ui--FormatBalance-unit {
    font-size: 0.825em;
    text-align: right;
  }
`

export default function ({ bold, title, value }: Props): React.ReactElement<Props> {
  const {isApiReady} = useApi();
  const preciseValue: BigNumber = new BigNumber(toPrecision(value, 8))
  const decimalsValue = preciseValue.toNumber().toFixed(4).slice(-4)
  const intValue = preciseValue.toNumber().toFixed(8).slice(0,-8)

  return (
    <div>
      <Title>{title}</Title>
      <Value className={bold ? 'bold' : ''}>
        {/* {props.value} */}
        {isApiReady ?<FormatBalance
          className='result'
          value={value}
          />:
          <>
          {/*<div>{preciseValue.toNumber().toFixed(4)}</div>*/}
          <LoadingValue>
            <span className='ui--FormatBalance-value"'>{intValue}</span>
            <span className='ui--FormatBalance-postfix'>{decimalsValue}</span>
            <span className='ui--FormatBalance-unit'>{'  PCX'}</span>
          </LoadingValue>
        </>
          }
      </Value>
    </div>
  );
}
