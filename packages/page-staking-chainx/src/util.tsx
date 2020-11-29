// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Menu } from '@polkadot/react-components';
import { ValidatorInfo } from './types';

export function createMenuGroup(items: (React.ReactNode | false | undefined | null)[]): React.ReactNode | null {
  const filtered = items.filter((item): item is React.ReactNode => !!item);

  return filtered.length
    ? <>{filtered}<Menu.Divider /></>
    : null;
}


export function isJSON(str: string): boolean {
  try {
    const obj = JSON.parse(str);

    return !!obj && typeof obj === 'object';
  } catch (e) { }

  return false;
}
export function AddNoDuplicateElements(arr: any, ele: any) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ele) {
      break;
    }

    if (i == arr.length - 1) {
      arr[i + 1] = ele;
    }
  }

  return arr;
}

export function compareValidator(itemsA: ValidatorInfo, itemsB: ValidatorInfo): number {
  if (JSON.stringify(itemsA.isValidating) === 'true') {
    if (itemsA.isChilled === itemsB.isChilled) {
      if (itemsA.totalNomination > itemsB.totalNomination) {
        return 1;
      } else if (itemsA.totalNomination < itemsB.totalNomination) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (itemsA.isChilled > itemsB.isChilled) {
        return 1;
      } else {
        return -1;
      }
    }
  } else {
    if (itemsA.isChilled === itemsB.isChilled) {
      if (itemsA.totalNomination > itemsB.totalNomination) {
        return 1;
      } else if (itemsA.totalNomination < itemsB.totalNomination) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (itemsA.isChilled > itemsB.isChilled) {
        return 1;
      } else {
        return -1;
      }
    }
  }
}

export function isBlank(value: any): boolean {
  if (value === null || value == undefined || value === '') {
    return true;
  }

  return false;
}

/**
     * 判断对象的属性是否为空
     * @param obj
     */
export function isNotEmptyObject(obj: any): boolean {
  if (typeof obj === 'object') {
    if (Object.keys(obj).length > 0) {
      return true;
    }
  }

  return false;
}

/**
     * 判断对象是否为空对象
     * @param value
     */
export function isNotBlankAndEmptyObject(value: any): boolean {
  if (value === null || value == undefined || value === '') {
    return false;
  }

  if (isNotEmptyObject(value)) {
    return true;
  } else {
    return false;
  }
}
