// Copyright 2017-2020 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import {useApi, useCall} from '@polkadot/react-hooks';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { BestFinalized, BestNumber, BlockToTime, TimeNow, TotalIssuance } from '@polkadot/react-query';
import { BN_ONE } from '@polkadot/util';

import SummarySession from './SummarySession';
import { useTranslation } from './translate';
import {RuntimeVersion} from '@polkadot/types/interfaces';

function Summary (): React.ReactElement {
  const { t } = useTranslation();
  const { api } = useApi();
  const runtimeVersion = useCall<RuntimeVersion>(api.rpc.state.subscribeRuntimeVersion);
  return (
    <SummaryBox>
      <section>
        <CardSummary label={t<string>('Last block')}>
          <TimeNow />
        </CardSummary>
        <CardSummary
          className='media--800'
          label={t<string>('Target')}
        >
          <BlockToTime blocks={BN_ONE} />
        </CardSummary>
        {api.query.balances && (
          <CardSummary
            className='media--800'
            label={t<string>('Total issuance')}
          >
            <TotalIssuance />
          </CardSummary>
        )}
        {runtimeVersion && <CardSummary
          className='media--800'
          label={t('Version')}
        >
          {runtimeVersion.specVersion.toNumber() }
        </CardSummary>}
      </section>
      {/*<section className='media--1200'>*/}
      {/*  <SummarySession withEra={false} />*/}
      {/*</section>*/}
      <section>
        {api.query.grandpa && (
          <CardSummary label={t<string>('Finalized')}>
            <BestFinalized />
          </CardSummary>
        )}
        <CardSummary label={t<string>('Latest height')}>
          <BestNumber />
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
