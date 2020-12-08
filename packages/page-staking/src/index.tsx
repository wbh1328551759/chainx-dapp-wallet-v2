// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props, ThemeProps } from '@polkadot/react-components/types';

import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HelpOverlay } from '@polkadot/react-components';
import Tabs from '@polkadot/react-components/Tabs';
import { useAccounts, useApi, useFavorites, useCall } from '@polkadot/react-hooks';
import { ValidatorInfo } from './types'
import { isJSON } from './utils'
import AccountSelect from '@polkadot/react-components-chainx/AccountSelect';

import basicMd from './md/basic.md';
import Overview from './Overview';
import UserNomination from './userNomination'
import Query from './Query';
import Summary from './Overview/Summary';

import { STORE_FAVS_BASE } from './constants';
import { useTranslation } from './translate';

const HIDDEN_ACC = ['actions', 'payout'];


function getSortList(validatorInfoList: ValidatorInfo[]) {

  let validating = validatorInfoList.filter(item => JSON.stringify(item.isValidating) === 'true')
  validating = validating.sort((a, b) => {
    return Number(BigInt(b.totalNomination) - BigInt(a.totalNomination))

  })
  let candidate = validatorInfoList.filter(item => JSON.stringify(item.isValidating) === 'false' && JSON.stringify(item.isChilled) === 'false')
  candidate = candidate.sort((a, b) => {
    return Number(BigInt(b.totalNomination) - BigInt(a.totalNomination))
  })
  let chill = validatorInfoList.filter(item => JSON.stringify(item.isValidating) === 'false' && JSON.stringify(item.isChilled) === 'true')
  chill = chill.sort((a, b) => {
    return Number(BigInt(b.totalNomination) - BigInt(a.totalNomination))
  })
  const sortList = []
  sortList.push(...validating)
  sortList.push(...candidate)
  sortList.push(...chill)
  return sortList;
}

function StakingApp({ basePath, className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const { hasAccounts, allAccounts } = useAccounts();
  const { pathname } = useLocation();
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS_BASE);

  const validators = useCall<string>(api.rpc.xstaking.getValidators);
  let validatorInfoList: ValidatorInfo[] = JSON.parse(isJSON(validators) ? validators : '[]');
  validatorInfoList = getSortList(validatorInfoList)

  const targets = validatorInfoList;

  const stakingOverview = {
    validators: validatorInfoList.map(item => item.account),
    accounts: allAccounts,
    validatorCount: validatorInfoList.filter(item => item.isValidating).length
  }

  const items = useMemo(() => [
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Staking overview')
    },
    {
      name: 'nomination',
      text: t<string>('My Staking')
    },
    {
      hasParams: true,
      name: 'query',
      text: t<string>('Validator stats')
    },
  ], []);

  return (
    <main className={`staking--App ${className}`}>
      {/* <HelpOverlay md={basicMd as string} /> */}
      {/*<AccountSelect />*/}
      <header>
        <Tabs
          basePath={basePath}
          hidden={
            hasAccounts
              ? undefined
              : HIDDEN_ACC
          }
          items={items}
        />
      </header>
      <Summary
        isVisible={pathname === basePath}
        next={[]}
        nominators={targets.nominators}
        stakingOverview={stakingOverview}
      />
      <Switch>
        <Route path={`${basePath}/nomination`}>
          <UserNomination
            basePath={basePath}
            validatorInfoList={validatorInfoList}
            onStatusChange={() => { }}
          />
        </Route>
        <Route path={[`${basePath}/query/:value`, `${basePath}/query`]}>
          <Query />
        </Route>
      </Switch>

      <Overview
        className={basePath === pathname ? '' : 'staking--hidden'}
        favorites={favorites}
        hasQueries={false}
        next={[]}
        stakingOverview={stakingOverview}
        targets={targets}
        toggleFavorite={toggleFavorite}
      />
    </main>
  );
}


export default React.memo(styled(StakingApp)(({ theme }: ThemeProps) => `
  .staking--hidden {
    display: none;
  }

  .staking--Chart {
    margin-top: 1.5rem;

    h1 {
      margin-bottom: 0.5rem;
    }

    .ui--Spinner {
      margin: 2.5rem auto;
    }
  }

  .staking--optionsBar {
    text-align: right;

    .staking--buttonToggle {
      display: inline-block;
      margin-right: 1rem;
      margin-top: 0.5rem;
    }
  }

  .ui--Expander.stakeOver {
    .ui--Expander-summary {
      color: ${theme.colorError};
    }
  }
`));
