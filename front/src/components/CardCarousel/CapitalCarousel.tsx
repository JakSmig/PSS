import { Space } from 'antd';
import React from 'react';

import Amsterdam from '../../assets/images/homepage/amsterdam.jpg';
import Luxembourg from '../../assets/images/homepage/luxembourg.jpg';
import Vienna from '../../assets/images/homepage/vienna2.jpg';
import { ItemCard } from './ItemCard';

const CapitalCarousel = () => {
  return (
    <Space
      style={{
        backgroundColor: 'transparent',
        height: '400px',
        width: '1000px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ItemCard image={Amsterdam} capitalName="Amsterdam" />
      <ItemCard image={Luxembourg} capitalName="Luxembourg" />
      <ItemCard image={Vienna} capitalName="Vienna" />
    </Space>
  );
};

export { CapitalCarousel };
