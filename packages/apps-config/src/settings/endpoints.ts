// Copyright 2017-2020 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from './types';

import { CUSTOM_ENDPOINT_KEY } from './constants';

interface EnvWindow {
  // eslint-disable-next-line camelcase
  process_env?: {
    WS_URL: string;
  }
}

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.tsx in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint

function createOwn(t: TFunction): LinkOption[] {
  try {
    const storedItems = localStorage.getItem(CUSTOM_ENDPOINT_KEY);

    if (storedItems) {
      const items = JSON.parse(storedItems) as string[];

      return items.map((textBy) => ({
        info: 'local',
        text: t('rpc.custom.entry', 'Custom', { ns: 'apps-config' }),
        textBy,
        value: textBy
      }));
    }
  } catch (e) {
    console.error(e);
  }

  return [];
}

function createDev(t: TFunction): LinkOption[] {
  return [
    {
      dnslink: 'local',
      info: 'local',
      text: t('rpc.local', 'Local Node', { ns: 'apps-config' }),
      textBy: '127.0.0.1:8087',
      value: 'ws://127.0.0.1:8087'
    }
  ];
}

function createLiveNetworks(t: TFunction): LinkOption[] {

  const endsArray = ['wss://mainnet.spiderx.pro/ws', 'wss://mainnet.chainx.org/ws']
  return [
    // polkadot test relays
    {
      dnslink: 'ChainX',
      info: 'ChainX',
      text: t('Chinese Node'),
      textBy: t('rpc.hosted.by', 'hosted by ChainX', { ns: 'apps-config', replace: { host: 'ChainX' } }),
      value: 'wss://mainnet.spiderx.pro/ws'
    },
    {
      dnslink: 'ChainX',
      info: 'ChainX',
      text: t('Patract Node'),
      textBy: t('rpc.hosted.by', 'hosted by Patract Elara', { ns: 'apps-config', replace: { host: 'ChainX' } }),
      value: 'wss://chainx.elara.patract.io'
    }
  ];
}

function createTestNetworks(t: TFunction): LinkOption[] {
  return [
    // polkadot test relays
    {
      dnslink: 'ChainX',
      info: 'ChainX',
      text: 'ChainX Test Network',
      textBy: t('rpc.hosted.by', 'hosted by ChainX', { ns: 'apps-config', replace: { host: 'ChainX' } }),
      value: 'wss://testnet-2.chainx.org/ws'
    }
  ];
}


function createCustom(t: TFunction): LinkOption[] {
  const WS_URL = (
    (typeof process !== 'undefined' ? process.env?.WS_URL : undefined) ||
    (typeof window !== 'undefined' ? (window as EnvWindow).process_env?.WS_URL : undefined)
  );

  return WS_URL
    ? [
      {
        isHeader: true,
        text: t('rpc.custom', 'Custom environment', { ns: 'apps-config' }),
        textBy: '',
        value: ''
      },
      {
        info: 'WS_URL',
        text: t('rpc.custom.entry', 'Custom {{WS_URL}}', { ns: 'apps-config', replace: { WS_URL } }),
        textBy: WS_URL,
        value: WS_URL
      }
    ]
    : [];
}

export function createWsEndpoints(t: TFunction): LinkOption[] {
  return [
    ...createCustom(t),
    {
      isHeader: true,
      text: t('rpc.header.live', 'Live networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createLiveNetworks(t),
    {
      isHeader: true,
      text: t('rpc.header.test', 'Test networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createTestNetworks(t),
    {
      isDevelopment: true,
      isHeader: true,
      text: t('rpc.header.dev', 'Development', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createDev(t),
    ...createOwn(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
