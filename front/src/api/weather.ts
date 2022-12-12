import { useQuery } from 'react-query';

import { weatherClient } from '../lib/axios';
import { IpLookup, Weather } from '../lib/types';

const useLocation = (location: string) =>
  useQuery<Weather>(
    ['weather', location],
    async () => {
      const res = await weatherClient.get<Weather>('/current.json', {
        params: {
          q: location,
        },
      });

      return res.data;
    },
    { enabled: !!location },
  );
const useIpLookup = () =>
  useQuery<IpLookup>('ipLookup', async () => {
    const res = await weatherClient.get<IpLookup>('/ip.json', {
      params: {
        q: 'auto:ip',
      },
    });
    return res.data;
  });

export { useLocation, useIpLookup };
