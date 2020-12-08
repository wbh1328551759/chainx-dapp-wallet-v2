// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';
import Component from '@polkadot/app-accounts-chainx/Accounts/index'

export default function create(t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'accounts',
    icon: 'users',
    name: 'allAccounts',
    text: t('nav.allAccounts', 'All accounts', { ns: 'apps-routing' })
  };
}
