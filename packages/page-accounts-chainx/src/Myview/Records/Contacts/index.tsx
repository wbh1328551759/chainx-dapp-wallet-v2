import React from 'react';
import { useAccounts, useLoadingDelay} from '@polkadot/react-hooks';
import Account from './Account'
import styled from 'styled-components';
import {Icon} from '@polkadot/react-components';

const Wrapper = styled.div`
  .ui--Row{

    .ui--Row-base{
      padding: 1em 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #EFEFEF;

      .ui-Row-icon{
        display: flex;
      }

      .ui--Row-details{
        .ui--Row-name{
          font-size: 14px;
        }

        .ui--Row-address{
          font-size: 12px;
        }
      }
    }

    .ui--Row-children{
      display: none;
    }
  }

  .addAccountBtn{
    width: 100%;
    background: rgba(246, 201, 74);
    border: none;
    height: 1.7em;
    cursor: pointer;

    &:focus{
      border: none;
      outline: none;
    }

    > svg{
      color: white;
      margin-right: 0;
    }
  }
`

function Contacts(){
  const isLoading = useLoadingDelay();
  const { allAccounts, hasAccounts } = useAccounts();

  return (
    <Wrapper>
      <button className='addAccountBtn'>
        <Icon icon='plus'/>
      </button>
      {isLoading ? undefined : (hasAccounts && allAccounts?.map((account, index): React.ReactNode => (
        <Account value={account} key={index}/>
      )))}
    </Wrapper>
  )
}

export default Contacts
