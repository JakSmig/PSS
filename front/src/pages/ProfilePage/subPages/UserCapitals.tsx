import { Button, Pagination, Space } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getAllCapitalsForUserStatus } from '../../../api/status';
import { CapitalStatus } from '../../../lib/types';
import { useAuthStore } from '../../../store/authStore';
import { UserCapitalCard } from '../components/UserCapitalCard';

const PAGE_SIZE = 3;

const UserCapitals = ({ color }: { color: string }) => {
  const { token } = useAuthStore();
  const [status, setStatus] = useState('VISITED');
  const capitals = useQuery({
    queryKey: ['capitalsStatus', [status, token]],
    queryFn: () =>
      getAllCapitalsForUserStatus({
        status: (status as unknown as CapitalStatus) || '',
        token: token || '',
      }),
    enabled: !!status,
  });
  const [state, setState] = useState({
    current: 1,
    minIndex: 0,
    maxIndex: PAGE_SIZE - 1,
  });
  const handleChange = (page: number) => {
    setState({
      current: page,
      minIndex: (page - 1) * PAGE_SIZE,
      maxIndex: page * PAGE_SIZE - 1,
    });
  };
  const handleSetStatus = (event: {
    currentTarget: {
      id: string;
    };
  }) => {
    setStatus(event.currentTarget.id);
  };
  return (
    <Space
      style={{
        backgroundColor: color,
        height: '500px',
        width: '700px',
        padding: '30px',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <Space
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button
          type={status === 'VISITED' ? 'primary' : 'default'}
          id="VISITED"
          onClick={handleSetStatus}
        >
          Visited
        </Button>
        <Button
          type={status === 'WANTVISIT' ? 'primary' : 'default'}
          id="WANTVISIT"
          onClick={handleSetStatus}
        >
          Want to visit
        </Button>
      </Space>
      <Space.Compact direction="vertical" style={{ width: '100%' }}>
        {capitals.data && (
          <>
            {capitals.data.map(
              (capital, idx) =>
                idx >= state.minIndex &&
                idx <= state.maxIndex && (
                  <UserCapitalCard
                    key={idx}
                    capitalName={capital.capitalName}
                  />
                ),
            )}
            <Pagination
              pageSize={PAGE_SIZE}
              current={state.current}
              total={capitals.data.length}
              onChange={handleChange}
              style={{ bottom: '0px' }}
            />
          </>
        )}
      </Space.Compact>
    </Space>
  );
};

export { UserCapitals };
