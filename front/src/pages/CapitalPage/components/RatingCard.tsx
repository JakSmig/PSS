import { Rate, Row, Space, Typography } from 'antd';
import React from 'react';
type Props = {
  value: number;
  category: string;
};
const RatingCard = ({ value, category }: Props) => {
  return (
    <Space.Compact
      direction="vertical"
      style={{
        backgroundColor: 'rgba(250,250,250,0.5)',
        borderRadius: '20px',
        boxShadow: '5px 10px 15px #919191',
        padding: '0 20px 20px',
      }}
    >
      <Row align="bottom">
        <Typography.Text style={{ fontSize: '40px', fontWeight: '700' }}>
          {value}
        </Typography.Text>

        <Typography.Text
          style={{
            fontSize: '25px',
            fontWeight: '500',
            marginBottom: '7px',
            marginLeft: '10px',
          }}
        >
          {category}
        </Typography.Text>
      </Row>
      <Rate defaultValue={value} allowHalf disabled />
    </Space.Compact>
  );
};
export { RatingCard };
