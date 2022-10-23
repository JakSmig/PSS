import React from 'react';
import Carousel from 'react-material-ui-carousel';

import { CardList } from './CardList';

const CarouselCard = () => {
  const items = [1, 2, 3];
  return (
    <Carousel
      navButtonsAlwaysVisible
      animation="slide"
      duration={2000}
      autoPlay={false}
      indicators={false}
      sx={{ minWidth: '100%', minHeight: '500px' }}
    >
      {items.map((item, id) => (
        <CardList key={id} />
      ))}
    </Carousel>
  );
};
export { CarouselCard };
