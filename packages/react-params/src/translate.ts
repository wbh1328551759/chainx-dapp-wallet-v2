// Copyright 2017-2020 @polkadot/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { UseTranslationResponse } from 'react-i18next';
import { useTranslation as useTranslationBase, withTranslation } from 'react-i18next';

export function useTranslation (): UseTranslationResponse {
  return useTranslationBase('react-params');
}

export default withTranslation(['react-params']);
