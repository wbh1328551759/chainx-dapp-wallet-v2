import React from 'react';
import styled from 'styled-components';
import chainxLogo from './ChainX_logo.svg';
import linkOut from './Link out.svg';
import helpIcon from './Help center.svg';
import setting from './Set up.svg'
import {Icon} from '@polkadot/react-components';
import AccountSelect from '../Menu/NodeInfo';

const Wrapper = styled.div`
  background: rgba(255, 255, 255);
  display: flex;
  justify-content: space-between;
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
          margin: auto 1em;
          padding: 0;
          background: rgba(0,0,0,0.3);
          width: 1px;
        }

        &:hover, &:focus{
          color: rgba(0,0,0,0.8);
          cursor: pointer;
        }
      }
    }
  }

  > .right{
    display: flex;
    align-items: center;
    > li{
      margin: 1.4em 1em 1.4em 1em;
      &.switchNode{
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0.5em 1.3em 0.5em 1.3em;
        background: rgba(249, 249, 249);
        border: 1px solid #EFEFEF;
        border-radius: 18px;
        > div {
          margin-right: 0.5em;
          &.circle{
            height: 0.5em;
            width: 0.5em;
            border-radius: 50%;
            background: rgba(52, 198, 154);
          }
        }

        &:hover, &:focus{
          color: rgba(0,0,0,0.8);
          cursor: pointer;
        }
      }
      &.icon{
        margin: 1.1em 0.6em 1.1em 0.6em;
        display: flex;
        align-items: center;
        &:hover, &:focus{
          cursor: pointer;
        }
      }
      &.accountSelector{
        margin: 0;
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

      <ul className="right">
        <li className='switchNode'>
          <div className='circle'/>
          <div>Main Newwork</div>
          <Icon icon='angle-down' size='1x'/>
        </li>
        <li className='icon'>
          <img src={helpIcon} alt=""/>
        </li>
        <li className='icon'>
          <img src={setting} alt=""/>
        </li>
        <li className='accountSelector'>
          <AccountSelect/>
        </li>
      </ul>

    </Wrapper>
  );
}

export default React.memo(NavBar);