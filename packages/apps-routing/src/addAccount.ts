// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';

import Modal from '@polkadot/app-accounts/modals/Create';

export default function create(t: TFunction): Route {
  return {
    Component: Modal,
    Modal,
    display: {
      isHidden: false,
      needsApi: []
    },
    group: 'accounts',
    icon: 'file-export',
    name: 'addAccount',
    text: t('nav.addAccount', 'Add account', { ns: 'apps-routing' })
  };
}
