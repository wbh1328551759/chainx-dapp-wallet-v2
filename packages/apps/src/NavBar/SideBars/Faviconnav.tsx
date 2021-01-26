import React, { useState } from 'react';
import styled from 'styled-components';
import Catalog  from '@polkadot/apps/NavBar/icons/catalog.svg';
import Sidebars from './index';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    img {
        width: 1.5rem;
        height: 1.5rem;
    }
    @media only screen and (min-width: 769px) {
      display: none;
    }
    .sidebarmarks{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: rgba(0,0,0,0.6);
      z-index: 998;
    }

`



function Faviconnav() {

    const [isCollapsed, setCollapsed] = useState(false);
    function testqwedsa() {
        setCollapsed(!isCollapsed)
    }

  return (
    <Wrapper className="faviconnav" >
        <img src={Catalog} alt=""  onClick={testqwedsa} />
        <Sidebars  isCollapsed={isCollapsed} onClose={testqwedsa} />
        <div className={`${isCollapsed ? 'sidebarmarks' : ''}`} onClick={testqwedsa} />
    </Wrapper>
  );
}

export default React.memo(Faviconnav);
