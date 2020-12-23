import React from 'react';
import {Link} from 'react-router-dom';

type NodeInfo = {
  nodeName: string;
  link: string;
}

interface Props{
  nodeList: NodeInfo[];
}

function Selector({nodeList}: Props): React.ReactElement<Props>{
  return (
    <div className='selector'>
      {
        nodeList.map((node: NodeInfo, index: number) =>
          <Link to={node.link} key={index}><span>{node.nodeName}</span></Link>
        )
      }
    </div>
  )
}

export default Selector
