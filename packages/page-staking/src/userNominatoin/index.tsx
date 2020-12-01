
import React, { useRef, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { Table } from '@polkadot/react-components';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import { useApi } from '@polkadot/react-hooks';
import { getNominationAndDividedExternal } from '@polkadot/react-hooks-chainx/useNomination';
import { useTranslation } from '../translate';
import { Nomination, UserNominations, Dividended, UserInterest } from '@polkadot/react-hooks-chainx/types';

import UserTable from './usertable';
import { ValidatorInfo } from '../types';

interface Props {
  account: KeyringAddress;
  validatorInfoList: ValidatorInfo[];
  className?: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content:space-between;
  align-items:center;
  height:100px;
`;

function UserNomination({ className = '', validatorInfoList }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { currentAccount } = useContext(AccountContext);
  const { api } = useApi();
  const [isLoading, setLoading] = useState<boolean>(true)
  //let { allDividended, allNominations } = useNomination([currentAccount]);

  const [state, setState] = useState<UserNominations>({
    allNominations: [],
    allDividended: []
  });

  useEffect((): void => {
    async function getNominationAndDivided() {
      setLoading(true)

      const allNominations: Nomination[] = [];
      const allDividended: UserInterest[] = [];
      const res = await api.rpc.xstaking.getNominationByAccount(
        currentAccount
      );
      let currentNomination: any = {};
      // 该用户的所有投票
      const userNominations = JSON.parse(res);

      Object.keys(userNominations).forEach((key: string) => {
        currentNomination = userNominations[key] as Nomination;
        currentNomination = Object.assign(currentNomination, {
          validatorId: key
        });
        currentNomination = Object.assign(currentNomination, {
          account: currentAccount
        });
        allNominations.push(currentNomination as Nomination);
      });
      const userDividedRes = await api.rpc.xstaking.getDividendByAccount(
        currentAccount
      );

      console.log(JSON.stringify(userDividedRes))
      let current: any = {};
      const dividedArray: Dividended[] = [];
      const userDivided = JSON.parse(userDividedRes);

      Object.keys(userDivided).forEach((key: string) => {
        current = {
          validator: key,
          interest: userDivided[key]
        };
        dividedArray.push(current);
      });

      const userInterest: UserInterest = {
        account: currentAccount,
        interests: dividedArray
      };

      allDividended.push(userInterest);
      setLoading(false)
      setState({
        allNominations: allNominations,
        allDividended: allDividended
      });

    }

    getNominationAndDivided()

  }, [currentAccount])

  const headerRef = useRef([
    [t<string>('My stake'), 'start'],
    [t<string>('Number of votes'), 'start'],
    [t<string>('Number of Interests'), 'start'],
    [t<string>('Freeze'), 'start'],
    [undefined, undefined, undefined, undefined, undefined, 'start']
  ]);

  return (
    <div>
      <div className={className}>
        <Table
          empty={!isLoading}
          header={headerRef.current}
        >
          {
            currentAccount && state.allNominations.map((item, index) => {
              const userInterest = state.allDividended.find(item => item.account === currentAccount)
              if (item.account === currentAccount) {
                return <UserTable
                  accountId={currentAccount}
                  nomination={state.allNominations[index]}
                  validatorInfoList={validatorInfoList}
                  userInterest={userInterest?.interests?.find(item => item.validator === state.allNominations[index].validatorId)?.interest}
                  onStausChange={async (status) => {
                    setLoading(false)
                    let userNominations = await getNominationAndDividedExternal(currentAccount, api)
                    setState(userNominations)
                    setLoading(true)
                  }}

                />
              } else {
                return null;
              }
            })
          }


        </Table>
      </div>
    </div>
  );
}


export default React.memo(styled(UserNomination)`

  
  .filter--tags {
    .ui--Dropdown {
      padding-left: 0;

      label {
        left: 1.55rem;
      }
    }
  }
`);
