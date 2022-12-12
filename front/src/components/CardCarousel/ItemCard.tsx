import { Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeStore } from '../../store/themeStore';
import './ItemCard.less';
type Props = {
  image: any;
  capitalName: string;
};

const ItemCard = ({ image, capitalName }: Props) => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`capital/${capitalName}`);
  };
  return (
    <Space
      className="capital-card"
      style={{
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        backgroundImage: `url(${image})`,
      }}
      onClick={handleClick}
    >
      <Typography.Text
        data-theme={theme}
        style={
          theme === 'light'
            ? {
                backgroundColor: '#1DA57A',
                color: '#fff',
                padding: '5px 10px',
                marginTop: '5px',
              }
            : { backgroundColor: '#77b0f2', padding: '5px' }
        }
      >
        {capitalName}
      </Typography.Text>
    </Space>
  );
};
export { ItemCard };
