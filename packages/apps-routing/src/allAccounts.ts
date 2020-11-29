// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';
import Component from '../../page-accounts/src/Accounts';

export default function create(t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'accounts',
    icon: 'users',
    name: 'All accounts',
    text: t('nav.allAccounts', 'All accounts', { ns: 'apps-routing' })
  };
}
