import React from 'react';

type Props = {
  color: string,
  type: string,
  data: string
}

export default function ({ color, data, type }: Props): React.ReactElement<Props> {
  return (
    <div>
      <div className='key'>
        <span className={color + 'Circle'}> </span>
        <span>{type}</span>
      </div>
      <div className='data'>
        <span>{data}</span>
      </div>
    </div>
  );
}
