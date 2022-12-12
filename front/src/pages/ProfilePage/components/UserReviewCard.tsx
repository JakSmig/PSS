import { Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeStore } from '../../../store/themeStore';
type Props = {
  capitalName: string;
  text: string;
  likes: number;
};
const UserReviewCard = ({ capitalName, text, likes }: Props) => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
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
      <Typography.Text style={{ fontWeight: '500', fontSize: '28px' }}>
        {capitalName}
      </Typography.Text>
      <Typography.Text>{text}</Typography.Text>
      <Typography.Text style={{ fontWeight: '500', fontSize: '18px' }}>
        likes {likes}
      </Typography.Text>
    </Space>
  );
};
export { UserReviewCard };
