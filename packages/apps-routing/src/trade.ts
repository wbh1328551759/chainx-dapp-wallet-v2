// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';

import Component from '../../page-trade/src/index';

export default function create(t: TFunction): Route {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    group: 'trade',
    name: 'DEX',
    text: t('nav.trade', 'DEX', { ns: 'apps-routing' })
  };
}
