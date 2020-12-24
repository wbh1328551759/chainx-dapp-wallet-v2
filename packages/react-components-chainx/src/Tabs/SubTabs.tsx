import React from 'react';
import styled from 'styled-components';
import {subItem} from '@polkadot/react-components-chainx/Tabs/types';
import SubTab from './SubTab';

const Wrapper = styled.div`
  position: absolute;
  right: 1.3em;
  display: flex;
  top: 1.9em;
`

interface Props {
  subItems: subItem[];
  basePath: string;
  name: string;
}

function SubTabs({subItems, basePath, name}: Props): React.ReactElement<Props>{

  return (
    <Wrapper>
      {subItems.map((item: subItem, index: number) =>
        <SubTab {...item} basePath={basePath} name={name}/>
      )}
    </Wrapper>
  )
}

export default SubTabs
