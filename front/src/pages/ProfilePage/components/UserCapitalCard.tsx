import { Space, Typography } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getCapitalInfo } from '../../../api/capital';
import { useThemeStore } from '../../../store/themeStore';

const UserCapitalCard = ({ capitalName }: { capitalName: string }) => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const cap = useQuery({
    queryKey: ['capital', capitalName],
    queryFn: () => getCapitalInfo(capitalName || ''),
    enabled: !!capitalName,
  });
  return (
    <Space
      style={{
        width: '600px',
        backgroundColor: theme === 'light' ? '#ddd' : '#725587',
        borderRadius: '20px',
        boxShadow: '5px 5px 10px #787878',
        padding: '20px',
        margin: '10px',
        justifyContent: 'space-between',
      }}
      onClick={() => navigate(`/capital/${capitalName}`)}
    >
      <Typography.Text style={{ fontSize: '28px', fontWeight: 500 }}>
        {cap.data?.name}, {cap.data?.country}
      </Typography.Text>

      {cap.data?.flaglocation && (
        <img
          src={`data:image/svg+xml;base64,${cap.data?.flaglocation.value}`}
          alt="flag"
          height={50}
          style={{ marginLeft: '20px' }}
        />
      )}
    </Space>
  );
};
export { UserCapitalCard };
