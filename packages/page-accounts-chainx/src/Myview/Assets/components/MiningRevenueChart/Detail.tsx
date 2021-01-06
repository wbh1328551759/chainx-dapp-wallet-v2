
import React from 'react';
import styled from 'styled-components';

type Props = {
  color: string,
  type: string,
  data: string
}
const Wrapper = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  @media screen and (min-width:767px) and (max-width:980px) {
    flex-direction: column;
  }
  >.key{
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: start;
    > span:first-child{
        display: inline-block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin-right: 12px;
    }
    > .yellowCircle{
      background: rgba(246, 201, 74);
    }
    > .greyCircle{
      background: rgba(194, 194, 194);
    }
    > .blueCircle{
      background: rgba(70, 174, 226);
    }
    > .orangeCircle{
      background: rgba(247, 147, 27);
    }
    > span:last-child{
        color: rgba(0, 0, 0, 0.32);
        font-size: 12px;
    }
  }
  > .data{
      color: rgba(75, 75, 75);
      font-weight: bold;
      font-size: 12px;
      width: 50%;
      text-align: center;
  }
`;

export default function ({ color, data, type }: Props): React.ReactElement<Props> {
  return (
    <Wrapper>
      <div className='key'>
        <span className={color + 'Circle'}> </span>
        <span>{type}</span>
      </div>
      <div className='data'>
        <span>{data}</span>
      </div>
    </Wrapper>
  );
}
