import React from 'react';
import PcxCard from './PcxCard';
import Assets from './Assets';
import styled from 'styled-components';
import Records from './Records';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import LoadingGif from './components/loading.gif'
import {useApi} from '@polkadot/react-hooks';

const Wrapper = styled.div`
  padding: 16px 0;
  margin: auto;
  width: 1280px;
  display: flex;
  position: relative;
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
  > div.accountLoading{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    > .gif{
      position: relative;
      > img{
        position: fixed;
         left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
      }
    }

    > .shade{
      background: rgba(0,0,0,0.2);
      width: 100vw;
      height:100vh;
      z-index: 99;
    }
  }
`;

interface Props {
  className?: string;
  onStatusChange: (status: ActionStatus) => void;
  basePath: string;
}

function AssetManagement({onStatusChange}: Props): React.ReactElement<Props> {
  const {isApiReady} = useApi()
  return (
      <Wrapper className='wrapper'>
        <div className='left'>
          <PcxCard onStatusChange={onStatusChange}/>
          <Assets/>
        </div>
        <div className='right'>
          <Records/>
        </div>
        {!isApiReady &&

        <div className='accountLoading'>
          <div className='gif'>
            <img src={LoadingGif} alt="" height={40} width={40}/>
          </div>
          <div className='shade'/>
        </div>}
      </Wrapper>
  );
}

export default React.memo(AssetManagement);
// export default AssetManagement
