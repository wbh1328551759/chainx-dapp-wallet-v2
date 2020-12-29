import React from 'react'
import {NavLink} from 'react-router-dom';
import {subItem} from '@polkadot/react-components-chainx/Tabs/types';
import styled from 'styled-components';

interface Props extends subItem {
  basePath: string;
  className?: string,
  name: string
}

const Wrapper = styled.div`
  border-bottom: 2px solid transparent;
  margin-bottom: -3px;

  > a{
    font-weight: 600;
    padding: 0.5rem 0.8rem 0.75rem;
    color: rgba(0,0,0,0.4) !important;
    &.tabLinkActive {
      color: rgba(0,0,0,0.8) !important;
    }
  }
`
function  SubTab({className = '', subText, subName, isSubRoot, basePath, name}: Props): React.ReactElement<Props>{
  const to = isSubRoot
    ? `${basePath}/${subName}`
    : `${basePath}/${name}/${subName}`;

  return(
    <Wrapper>
      <NavLink
        activeClassName='tabLinkActive'
        className={`ui--Tab ${className}`}
        exact
        strict
        to={to}>
        {subText}
      </NavLink>
    </Wrapper>
  )
}

export default SubTab
