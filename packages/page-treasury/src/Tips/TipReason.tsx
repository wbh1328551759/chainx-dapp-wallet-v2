// Copyright 2017-2020 @polkadot/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash } from '@polkadot/types/interfaces';
import type { Bytes, Option } from '@polkadot/types';

import React from 'react';
import { useApi, useCall } from '@polkadot/react-hooks';
import { hexToString } from '@polkadot/util';
import styled from 'styled-components';

interface Props {
  hash: Hash;
}

const transformTip = {
  transform: (optBytes: Option<Bytes>) =>
    optBytes.isSome
      ? hexToString(optBytes.unwrap().toHex())
      : null
};

const Td = styled.td`
  max-width: 556px;
  > div{
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
`
function TipReason ({ hash }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const reasonText = useCall<string | null>(api.query.treasury.reasons, [hash], transformTip);

  return (
    <Td className='start all'><div>{reasonText || hash.toHex()}</div></Td>
  );
}

export default React.memo(TipReason);
