import { useQuery } from 'react-query';

import { overpassClient } from '../lib/axios';
import { generateCacheKey } from '../lib/generateCacheKey';
import { OverpassCapital } from '../lib/types';

const useCapitals = (coordinates: string, zoom: number) => {
  const query = `
    [out:json];
    relation["admin_level"="2"]["type"="boundary"]["boundary"="administrative"];
    node(r:"admin_centre");
    node._${coordinates};
     out qt;`;

  const cacheKey = generateCacheKey(coordinates);
  cacheKey.push(zoom);

  return useQuery<OverpassCapital[]>(['capitals', cacheKey], async () => {
    const res = await overpassClient.post<{
      elements: OverpassCapital[];
    }>('/interpreter', query);

    const data = res.data.elements;
    return data;
  });
};

export { useCapitals };
