// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveElectionsInfo } from '@polkadot/api-derive/types';
import type { BlockNumber } from '@polkadot/types/interfaces';
import type { ComponentProps } from './types';
import styled from 'styled-components';
import React from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';

interface Props extends ComponentProps {
  bestNumber?: BlockNumber;
  className?: string;
  electionsInfo?: DeriveElectionsInfo;
}

function Summary ({ bestNumber, className = '', electionsInfo }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  if (!electionsInfo) {
    return null;
  }

  const { candidateCount, desiredRunnersUp, desiredSeats, members, runnersUp, termDuration, voteCount } = electionsInfo;

  return (
    <SummaryBox className={className}>
      <section>
        <CardSummary label={t<string>('Seats')}>
          {formatNumber(members.length)}&nbsp;/&nbsp;{formatNumber(desiredSeats)}
        </CardSummary>
        <CardSummary label={t<string>('Runners Up')}>
          {formatNumber(runnersUp.length)}&nbsp;/&nbsp;{formatNumber(desiredRunnersUp)}
        </CardSummary>
        <CardSummary label={t<string>('Candidates')}>
          {formatNumber(candidateCount)}
        </CardSummary>
      </section>
      {voteCount && (
        <section className="media--1100">
          <CardSummary label={t<string>('Voting Round')}>
            #{formatNumber(voteCount)}
          </CardSummary>
        </section>
      )}
      {bestNumber && termDuration?.gtn(0) && (
        <section  className="media--1100">
          <CardSummary
            label={t<string>('Term Progress')}
            progress={{
              total: termDuration,
              value: bestNumber.mod(termDuration),
              withTime: true
            }}
          />
        </section>
      )}
    </SummaryBox>
  );
}

export default React.memo(styled(Summary)`
  @media screen and (max-width:600px){
    flex-direction: column;
  }

`);
