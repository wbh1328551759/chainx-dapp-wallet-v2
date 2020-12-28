// Copyright 2017-2020 @polkadot/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { QueryTypes, ParitalQueryTypes } from '../types';

import React, { useCallback, useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@polkadot/react-components-chainx';

import Consts from './Consts';
import Modules from './Modules';
import Raw from './Raw';
import { useTranslation } from '../translate';

interface Props {
  basePath: string;
  onAdd: (query: QueryTypes) => void;
}

let id = -1;

function Selection ({ basePath, onAdd }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const itemsRef = useRef([
    {
      name: 'chainstate',
      text: t<string>('Chain state'),
      subItems: [
        {
          isSubRoot: true,
          subName: 'chainstate',
          subText: t<string>('Storage')
        },
        {
          subName: 'constants',
          subText: t<string>('Constants')
        },
        {
          subName: 'raw',
          subText: t<string>('Raw storage')
        },
      ]
    },
    {
      name: 'extrinsics',
      text: t<string>('Extrinsics'),
    },
    {
      name: 'rpc',
      text: t<string>('RPC calls')
    },
    {
      name: 'signing',
      text: t<string>('Sign and verify'),
      subItems: [
        {
          isSubRoot: true,
          subName: 'signing',
          subText: t<string>('Sign message')
        },
        {
          subName: 'constants',
          subText: t<string>('Verify signature')
        },
        {
          subName: 'raw',
          subText: t<string>('Hash data')
        },
      ]
    }
  ]);

  const _onAdd = useCallback(
    (query: ParitalQueryTypes): void => onAdd({ ...query, id: ++id }),
    [onAdd]
  );

  return (
    <>
      <header>
        <Tabs
          basePath={basePath}
          items={itemsRef.current}
        />
      </header>
      <Switch>
        <Route path={`${basePath}/constants`}><Consts onAdd={_onAdd} /></Route>
        <Route path={`${basePath}/raw`}><Raw onAdd={_onAdd} /></Route>
        <Route><Modules onAdd={_onAdd} /></Route>
      </Switch>
    </>
  );
}

export default React.memo(Selection);