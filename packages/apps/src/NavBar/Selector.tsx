import React, {MouseEventHandler} from 'react';
import {Link} from 'react-router-dom';

type NodeInfo = {
  nodeName: string;
  link: string;
}

interface Props extends React.DOMAttributes<any>{
  nodeList: NodeInfo[];
}

function Selector({nodeList, onMouseLeave}: Props): React.ReactElement<Props>{
  return (
    <div className='selector' onMouseLeave={onMouseLeave}>
      {
        nodeList.map((node: NodeInfo, index: number) =>
          <Link to={node.link} key={index}><span>{node.nodeName}</span></Link>
        )
      }
    </div>
  )
}

export default Selector
