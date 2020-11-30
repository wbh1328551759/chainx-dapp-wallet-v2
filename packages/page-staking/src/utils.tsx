
import React from 'react';
import { Menu } from '@polkadot/react-components';

export function createMenuGroup(items: (React.ReactNode | false | undefined | null)[]): React.ReactNode | null {
    const filtered = items.filter((item): item is React.ReactNode => !!item);

    return filtered.length
        ? <>{filtered} < Menu.Divider /> </>
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
