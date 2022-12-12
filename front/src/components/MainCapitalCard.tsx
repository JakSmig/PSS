import { Image, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Capital } from '../lib/types';

const MainCapitalCard = ({ capital }: { capital: Capital }) => {
  const navigate = useNavigate();
  return (
    <Space
      style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '20px 40px',
        marginTop: '20px',
      }}
      onClick={() => navigate(`capital/${capital.name}`)}
    >
      <Space.Compact direction="vertical">
        <Typography.Text style={{ fontWeight: '600', fontSize: '30px' }}>
          {capital.name}
        </Typography.Text>
        <Typography.Text> {capital.country}</Typography.Text>
      </Space.Compact>
      {capital.flaglocation && (
        <Image
          src={`data:image/svg+xml;base64,${capital.flaglocation.value}`}
          alt="flag"
          width={80}
          height={40}
          preview={false}
        />
      )}
    </Space>
  );
};

export { MainCapitalCard };
