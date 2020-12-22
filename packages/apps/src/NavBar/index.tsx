import React from 'react';
import styled from 'styled-components';
import chainxLogo from './ChainX_logo.svg';
import linkOut from './Link out.svg';
import {Icon} from '@polkadot/react-components';

const Wrapper = styled.div`
  background: rgba(255, 255, 255);
  display: flex;
  justify-content: space-between;
  border:1px solid orange;
  padding-left: 1em;
  padding-right: 1em;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: rgba(0,0,0,0.4);

  > .left{
    display: flex;
    > ul{
      display: flex;
      > li{
        //border: 1px solid red;
        //margin:0 1.7em 0 0;
        padding: 1.4em 1em 1.4em 1em;
        &:first-child{
          margin-left: 1.7em;
        }
        > svg, img{
          margin-left: 0.3em;
        }
        &.linkOutBrowser{
          display: flex;
          align-items: start;
        }
        &.divideLine{
          height: 1.5em;
          margin: auto;
          padding: 0;
          background: rgba(0,0,0,0.3);
          width: 1px;
        }
      }
    }
  }
`;

function NavBar() {
  return (
    <Wrapper>
      <div className="left">
        <img src={chainxLogo} alt=""/>
        <ul>
          <li>资产</li>
          <li>
            投票抵押
            <Icon icon='angle-down' size='1x'/>
          </li>
          <li>治理<Icon icon='angle-down'/></li>
          <li>交易</li>
          <li className='linkOutBrowser'>
            区块浏览器
            <img src={linkOut} alt=""/>
          </li>
          <li className='divideLine'/>
          <li>开发者<Icon icon='angle-down'/></li>
        </ul>
      </div>
      <div className="right">
        <div className='right'></div>
      </div>
    </Wrapper>
  );
}

export default React.memo(NavBar);
