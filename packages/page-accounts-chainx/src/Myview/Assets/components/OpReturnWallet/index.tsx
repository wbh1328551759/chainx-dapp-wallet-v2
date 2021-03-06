
import React from 'react';
import styled from 'styled-components';
import wallets from './wallets';
import ReactTooltip from 'react-tooltip';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  opacity: 1;
  font-size: 14px;
  color: #3f3f3f;
  text-align: justify;
  line-height: 20px;
  a {
    text-decoration: none;
    font-size: 14px;
    color: #087fc2;
    text-align: justify;
    line-height: 20px;
  }
  img {
    max-height: 400px;
  }
`;

export default function () {
  return (
    <Wrapper>
      <span>目前支持发送 OP_RETURN 的钱包有：</span>
      {wallets.map((wallet, index) => {
        return (
          <span key={index}>
            <a data-for={wallet.text}
              data-tip
              href={wallet.url}>
              {wallet.text}
            </a>
            、
            <ReactTooltip effect='solid'
              id={wallet.text}>
              <img alt=''
                src={wallet.img} />
            </ReactTooltip>
          </span>
        );
      })}
    </Wrapper>
  );
}
