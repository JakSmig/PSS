import { useQuery } from 'react-query';

import { OverpassCapital } from '../models/Capital';
import { generateCacheKey } from '../utils/generateCacheKey';
import { overpassClient } from './client';

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
