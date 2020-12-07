// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';
import Component from '@polkadot/react-components-chainx/chainBrowser';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'network',
    icon: 'network-wired',
    name: 'chainBrowser',
    text: t('nav.browser', 'ChainBrowser', { ns: 'apps-routing' })
  };
}
