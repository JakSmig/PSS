import { Pagination, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getReviewsForUser } from '../../../api/review';
import { useAuthStore } from '../../../store/authStore';
import { UserReviewCard } from '../components/UserReviewCard';

const PAGE_SIZE = 3;

const UserReviews = ({ color }: { color: string }) => {
  const { token } = useAuthStore();
  const reviews = useQuery({
    queryKey: ['userReviews', [token]],
    queryFn: () =>
      getReviewsForUser({
        token: token || '',
      }),
    enabled: !!token,
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
          justifyContent: 'center',
        }}
      >
        <Typography.Text style={{ fontWeight: 500, fontSize: '30px' }}>
          Your reviews
        </Typography.Text>
      </Space>
      <Space.Compact direction="vertical" style={{ width: '100%' }}>
        {reviews.data && (
          <>
            {reviews.data.map(
              (review, idx) =>
                idx >= state.minIndex &&
                idx <= state.maxIndex && (
                  <UserReviewCard
                    key={idx}
                    capitalName={review.capital}
                    likes={review.likeRatio}
                    text={review.cText}
                  />
                ),
            )}
            <Pagination
              pageSize={PAGE_SIZE}
              current={state.current}
              total={reviews.data.length}
              onChange={handleChange}
              style={{ bottom: '0px' }}
            />
          </>
        )}
      </Space.Compact>
    </Space>
  );
};

export { UserReviews };
