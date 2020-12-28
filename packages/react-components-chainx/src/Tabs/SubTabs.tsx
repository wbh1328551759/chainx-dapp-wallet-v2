import React from 'react';
import styled from 'styled-components';
import {subItem} from '@polkadot/react-components-chainx/Tabs/types';
import SubTab from './SubTab';

const Wrapper = styled.div`
  position: absolute;
  right: 1.3em;
  display: flex;
  top: 1.9em;

  .divideLine{
    height: 1.5em;
    padding: 0;
    background: #ADADAD;
    width: 1px;
  }
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
        <>
        <SubTab {...item} basePath={basePath} name={name}/>
        {subItems.length - 1 !== index ? <div className='divideLine'/>: null}
        </>
      )}
    </Wrapper>
  )
}

export default SubTabs
