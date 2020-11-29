
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { toPrecision } from '../../../../components/toPrecision';
import BigNumber from 'bignumber.js';

const Wrapper = styled.div`
  opacity: 0.72;
  font-size: 13px;
  color: #000000;
  letter-spacing: 0.2px;
  line-height: 18px;
`;

type Props = {
  asset: string | undefined,
  free: string | undefined,
  precision: number
}

export default function ({ asset, free, precision }: Props): React.ReactElement<Props> {
  const validFree = free;
  const validPrecision = precision;
  const bgFree = new BigNumber(free)
  return (
    <Wrapper>
      <span>{asset}: </span>
      <span>{validFree && validPrecision && toPrecision(bgFree, precision)}</span>
    </Wrapper>
  );
}
