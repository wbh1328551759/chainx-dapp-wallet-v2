import React from 'react';
import PcxCard from './PcxCard';
import Assets from './Assets';
import styled from 'styled-components';
import Records from './Records';
import {ActionStatus} from '@polkadot/react-components/Status/types';

const Wrapper = styled.div`
  padding: 16px 0;
  margin: auto;
  width: 1280px;
  display: flex;
  div.left {
    flex: 1;
  }

  div.right {
    width: 300px;
    margin: 0 32px 0 16px;
    display: flex;
    flex-direction: column;
    & > section {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
`;

interface Props {
  className?: string;
  onStatusChange: (status: ActionStatus) => void;
  basePath: string;
}

function AssetManagement({onStatusChange}: Props): React.ReactElement<Props> {
  return (
      <Wrapper className='wrapper'>
        <div className='left'>
          <PcxCard onStatusChange={onStatusChange}/>
          <Assets/>
        </div>
        <div className='right'>
          <Records/>
        </div>
      </Wrapper>
  );
}

export default React.memo(AssetManagement);
// export default AssetManagement
