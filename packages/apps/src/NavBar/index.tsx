import React from 'react';
import styled from 'styled-components';
import chainxLogo from './ChainX_logo.svg'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > .left{
    display: flex;
    > ul{
      display: flex;
    }
  }
`

function NavBar(){
  return(
    <Wrapper>
      <div className="left">
        <img src={chainxLogo} alt=""/>
        <ul>
          <li>资产</li>
          <li>投票抵押</li>
          <li>治理</li>
          <li>交易</li>
          <li>区块浏览器</li>
          <li>开发者</li>
        </ul>
      </div>
      <div className="right">
        <div>right</div>
      </div>
    </Wrapper>
  )
}

export default React.memo(NavBar)
