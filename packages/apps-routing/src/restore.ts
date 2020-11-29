// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';

import Modal from '@polkadot/app-accounts/modals/Import';

export default function create (t: TFunction): Route {
  return {
    Component: Modal,
    Modal,
    display: {
      needsApi: []
    },
    group: 'accounts',
    icon: 'paper-plane',
    name: 'restore',
    text: t('nav.restore', 'Restore JSON', { ns: 'apps-routing' })
  };
}
