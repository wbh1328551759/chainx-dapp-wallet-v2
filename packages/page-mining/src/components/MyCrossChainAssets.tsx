import React, { useRef } from 'react';
import { Table } from '@polkadot/react-components';
import { useLoadingDelay } from '@polkadot/react-hooks';

export default function (): React.ReactElement {
  const isLoading = useLoadingDelay();
  const headerRef = useRef([]);

  return (
    <Table
      empty={!isLoading}
      header={headerRef.current}
    >

    </Table>);
}
