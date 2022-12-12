import { useEffect } from 'react';
import { useQuery } from 'react-query';
import shallow from 'zustand/shallow';

import { getUser } from '../api/user';
import { useAuthStore } from '../store/authStore';

export const useCurrentUser = () => {
  const { token, setUser } = useAuthStore(
    state => ({ token: state.token, user: state.user, setUser: state.setUser }),
    shallow,
  );

  const query = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => getUser(token as string),
    enabled: !!token,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data?.data) {
      setUser(query.data.data);
    }
  }, [query.data, setUser]);

  return query;
};
