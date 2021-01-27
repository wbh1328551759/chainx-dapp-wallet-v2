import React from 'react';
import LoadingGif from '@polkadot/app-accounts-chainx/Myview/components/loading.gif';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
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
`

function AccountLoading(){
  return(
    <LoadingWrapper>
      <div className='gif'>
        <img src={LoadingGif} alt="" height={40} width={40}/>
      </div>
      <div className='shade'/>
    </LoadingWrapper>
  )
}
export default AccountLoading
