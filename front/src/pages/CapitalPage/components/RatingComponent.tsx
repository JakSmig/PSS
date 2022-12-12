import { Col, Row } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';

import { getCapitalAverage } from '../../../api/capital';
import { RatingCard } from './RatingCard';

const RatingComponent = ({ capitalName }: { capitalName: string }) => {
  const ratings = useQuery({
    queryKey: ['ratings', capitalName],
    queryFn: () => getCapitalAverage(capitalName),
    enabled: !!capitalName,
  });
  const round = (value: number) => {
    return Math.round(value * 10) / 10;
  };
  return (
    <>
      {ratings.data && (
        <Col style={{ width: '500px' }}>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '70px',
            }}
          >
            <RatingCard
              category="General"
              value={round(ratings.data?.rating_general_avg)}
            />
            <RatingCard
              category="Food"
              value={round(ratings.data?.rating_food_avg)}
            />
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <RatingCard
              category="Attractions"
              value={round(ratings.data?.rating_attraction_avg)}
            />
            <RatingCard
              category="Transport"
              value={round(ratings.data?.rating_transport_avg)}
            />
          </Row>
        </Col>
      )}
    </>
  );
};

export { RatingComponent };
