// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

export interface subItem {
  isSubRoot?: boolean;
  subName: string;
  subText: string
}

export interface TabItem {
  alias?: string;
  count?: number;
  hasParams?: boolean;
  isExact?: boolean;
  isRoot?: boolean;
  name: string;
  text: React.ReactNode;
  subItems: subItem[];
}
