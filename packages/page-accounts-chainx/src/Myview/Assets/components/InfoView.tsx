
import React from 'react';
import styled, { css } from 'styled-components';
import Title from './Title';

const Info = styled.p`
  margin-top: 4px;
  opacity: 0.72;
  font-size: 13px;
  color: #000000;
  line-height: 18px;
`;

type Props = {
  title: string,
  info: string
}
export default React.memo(function ({ info, title }: Props): React.ReactElement<Props> {
  return (
    <div>
      <Title>{title}</Title>
      <Info><span>{info}</span></Info>
    </div>
  );
});
