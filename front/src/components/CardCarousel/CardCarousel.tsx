import { Carousel } from 'antd';
import React from 'react';

import { CapitalCarousel } from './CapitalCarousel';

const CardCarousel = () => {
  return (
    <Carousel autoplay style={{ width: '1000px' }}>
      <div>
        <CapitalCarousel />
      </div>
      <div>
        <CapitalCarousel />
      </div>
      <div>
        <CapitalCarousel />
      </div>
    </Carousel>
  );
};
export { CardCarousel };
