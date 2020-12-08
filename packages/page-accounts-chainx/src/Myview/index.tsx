import React from 'react';

import PcxCard from './PcxCard';
import Assets from './Assets';
import styled from 'styled-components';
import Records from './Records';
import AccountSelect from '@polkadot/react-components-chainx/AccountSelect';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import NoAccount from './NoAccount';
import {useAccounts} from '@polkadot/react-hooks';

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
  const {hasAccounts} = useAccounts();
  return (
    hasAccounts ?
      <Wrapper className='wrapper'>
        <AccountSelect/>
        <div className='left'>
          <PcxCard onStatusChange={onStatusChange}/>
          <Assets/>
        </div>
        <div className='right'>
          <Records/>
        </div>
      </Wrapper>
      : <NoAccount onStatusChange={onStatusChange}/>
  );
}

export default React.memo(AssetManagement);
// export default AssetManagement
