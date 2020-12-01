
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFills(): Fill[] {
  const [state, setState] = useState<Fill[]>([]);

  useEffect((): void => {
    async function fetch() {
      const res = await axios.get('https://api-v2.chainx.org/dex/fills/0');

      setState([
        ...res.data.items
      ]);
    }

    fetch();
  }, [state]);

  return state;
}
