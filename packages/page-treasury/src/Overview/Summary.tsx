// Copyright 2017-2020 @polkadot/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveBalancesAccount } from '@polkadot/api-derive/types';
import type { Balance } from '@polkadot/types/interfaces';

import BN from 'bn.js';
import React from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { formatNumber, stringToU8a } from '@polkadot/util';

import { useTranslation } from '../translate';

const TREASURY_ACCOUNT = '5S7WgdAXVK7mh8REvXfk9LdHs3Xqu9B2E9zzY8e4LE8Gg2ZX';

interface Props {
  approvalCount?: number;
  proposalCount?: number;
}

const PM_DIV = new BN(1000000);

function Summary({ approvalCount, proposalCount }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const bestNumber = useCall<Balance>(api.derive.chain.bestNumber);
  const totalProposals = useCall<BN>(api.query.treasury.proposalCount);
  const treasuryBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [TREASURY_ACCOUNT]);
  const spendPeriod = api.consts.treasury.spendPeriod;

  const value = treasuryBalance?.freeBalance.gtn(0)
    ? treasuryBalance.freeBalance
    : null;
  const burn = treasuryBalance?.freeBalance.gtn(0) && !api.consts.treasury.burn.isZero()
    ? api.consts.treasury.burn.mul(treasuryBalance?.freeBalance).div(PM_DIV)
    : null;

  return (
    <SummaryBox>
      <section>
        <CardSummary label={t<string>('Proposals')}>
          {formatNumber(proposalCount)}
        </CardSummary>
        <CardSummary label={t<string>('Total')}>
          {formatNumber(totalProposals || 0)}
        </CardSummary>
      </section>
      <section className='media--1200'>
        <CardSummary label={t<string>('Approved')}>
          {formatNumber(approvalCount)}
        </CardSummary>
      </section>
      <section>
        {value && (
          <CardSummary label={t<string>('Available')}>
            <FormatBalance
              value={value}
              withSi
            />
          </CardSummary>
        )}
        {burn && (
          <CardSummary
            className='media--1000'
            label={t<string>('next burn')}
          >
            <FormatBalance
              value={burn}
              withSi
            />
          </CardSummary>
        )}
      </section>
      {bestNumber && spendPeriod?.gtn(0) && (
        <section className='media--1000'>
          <CardSummary
            label={t<string>('Spend Period')}
            progress={{
              total: spendPeriod,
              value: bestNumber.mod(spendPeriod),
              withTime: true
            }}
          />
        </section>
      )}
    </SummaryBox>
  );
}

export default React.memo(Summary);
