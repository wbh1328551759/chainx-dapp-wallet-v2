
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { toPrecision } from '../../components/toPrecision';
import { FillContext } from '../FillProvider';
// import useFills from '../../hooks/useFills';

const Wrapper = styled.div`
  background: #ffffff;
  border-top: 1px solid #dce0e2;
  border-bottom: 1px solid #dce0e2;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  padding-left: 100px;
`;

export default function (): React.ReactElement {
  // const fills = useFills();
  const { fills } = useContext(FillContext);
  
  const [latest, setLatest] = useState();

  return (
    <Wrapper style={{ color: latest ? '#2caa84' : '#DC6E46' }}>
      {fills[0]?.price ? Number(toPrecision(fills[0]?.price, 9)).toFixed(7) : toPrecision(0, 7)
      }
    </Wrapper>
  );
}
