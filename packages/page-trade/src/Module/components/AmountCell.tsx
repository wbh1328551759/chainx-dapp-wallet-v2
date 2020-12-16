
import React from 'react';
import Amount from './Amount';
import styled from 'styled-components';
import BaseCell from './BaseCell';

const Cell = styled(BaseCell)`
  color: #000000;
  letter-spacing: 0.2px;
  line-height: 16px;
  padding: 0 0 0 12px !important;
  width: 42%;
`;

type Props = {
  value: number,
  precision: number
}

export default function ({ precision = 0, value }: Props): React.ReactElement<Props> {
  return (
    <Cell>
      <Amount precision={precision}
        value={value} />
    </Cell>
  );
}
