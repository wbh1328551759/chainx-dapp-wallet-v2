
import React from 'react';
import styled from 'styled-components';

const Outter = styled.span`
  opacity: 0.72;
  color: #000000;
`;

const Inner = styled.span`
  opacity: 0.32;
`;

function zeroSmoke(value: number): number | React.ReactElement {
  if (value > 0) {
    const str = value.toString();
    const Reg = new RegExp(/0{3,}$/);

    if (Reg.test(str)) {
      return (
        <>
          {str.replace(Reg, '')}
          <Inner>{str.match(Reg)[0]}</Inner>
        </>
      );
    } else {
      return value;
    }
  }

  return <Inner>{value}</Inner>;
}

function numberToAmount(number: number, precision: number): React.ReactElement {
  const options = {};

  options.minimumFractionDigits = precision;
  options.maximumFractionDigits = precision;
  options.useGrouping = false;

  const value = new Intl.NumberFormat(undefined, options).format(
    number / Math.pow(10, precision)
  );

  return <>{zeroSmoke(value)}</>;
}

type Props = {
  value: number,
  precision: number
}

export default function ({ precision, value }: Props): React.ReactElement<Props> {
  return <Outter>{numberToAmount(value, precision)}</Outter>;
}
