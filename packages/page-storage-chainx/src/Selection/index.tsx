// Copyright 2017-2020 @polkadot/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {QueryTypes, ParitalQueryTypes} from '../types';

import React, {useCallback, useContext, useRef} from 'react';
import {Route, Switch} from 'react-router';
import {Tabs} from '@polkadot/react-components-chainx';
import Consts from './Consts';
import Modules from './Modules';
import Raw from './Raw';
import ExtrinsicsSelection from '@polkadot/app-extrinsics/Selection';
import RpcSelection from '@polkadot/app-rpc/Rpc';
import {useTranslation} from '../translate';
import HashSelection from '@polkadot/app-signing/Hash';
import VerifySelection from '@polkadot/app-signing/Verify';
import Sign from '@polkadot/app-signing/Sign';
import Forks from '@polkadot/app-explorer-chainx/Forks';
import NodeInfo from '@polkadot/app-explorer-chainx/NodeInfo';
import BlockInfo from '@polkadot/app-explorer-chainx/BlockInfo';
import Main from '@polkadot/app-explorer-chainx/Main';
import {BlockAuthorsContext, EventsContext} from '@polkadot/react-query';

interface Props {
  basePath: string;
  onAdd: (query: QueryTypes) => void;
}

let id = -1;

function Selection({basePath, onAdd}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const events = useContext(EventsContext);
  const { lastHeaders } = useContext(BlockAuthorsContext);

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
          subText: t<string>('Raw Storage')
        },
      ]
    },
    {
      name: 'extrinsics',
      text: t<string>('Extrinsics'),
    },
    {
      name: 'rpc',
      text: t<string>('RPC Calls')
    },
    {
      name: 'signing',
      text: t<string>('Sign and verify'),
      subItems: [
        {
          isSubRoot: true,
          subName: 'signing',
          subText: t<string>('Sign Message')
        },
        {
          subName: 'constants',
          subText: t<string>('Verify Signature')
        },
        {
          subName: 'raw',
          subText: t<string>('Hash Data')
        },
      ]
    },
    {
      name: 'explorer',
      text: t<string>('Explorer'),
      subItems: [
        {
          isSubRoot: true,
          subName: 'explorer',
          subText: t<string>('Chain Info')
        },
        {
          subName: 'query',
          subText: t<string>('Block Details')
        },
        {
          subName: 'forks',
          subText: t<string>('Forks')
        },
        {
          subName: 'node',
          subText: t<string>('Node Info')
        },
      ]
    }
  ]);

  const _onAdd = useCallback(
    (query: ParitalQueryTypes): void => onAdd({...query, id: ++id}),
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
        <Route path={`${basePath}/chainstate/constants`}><Consts onAdd={_onAdd}/></Route>
        <Route path={`${basePath}/chainstate/raw`}><Raw onAdd={_onAdd}/></Route>
        <Route path={`${basePath}/extrinsics`}><ExtrinsicsSelection/> </Route>
        <Route path={`${basePath}/rpc`}> <RpcSelection/></Route>
        <Route path={`${basePath}/signing/constants`}> <HashSelection/></Route>
        <Route path={`${basePath}/signing/raw`}> <VerifySelection/></Route>
        <Route path={`${basePath}/signing`}> <Sign/></Route>
        <Route path={`${basePath}/explorer/node`}><NodeInfo/> </Route>
        <Route path={`${basePath}/explorer/forks`}> <Forks/></Route>
        <Route path={`${basePath}/explorer/query/:value`}> <BlockInfo/></Route>
        <Route path={`${basePath}/explorer/query`}><BlockInfo/> </Route>
        <Route path={`${basePath}/explorer`}>
          <Main events={events} headers={lastHeaders}/>
        </Route>

        <Route path={`${basePath}/chainstate`}><Modules onAdd={_onAdd}/></Route>
      </Switch>
    </>
  );
}

export default React.memo(Selection);
