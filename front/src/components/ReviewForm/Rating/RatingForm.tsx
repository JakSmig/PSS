import { Button, Col, Form, Rate, Row, Typography } from 'antd';
import React from 'react';

import { Ratings, useReviewStore } from '../../../store/reviewStore';
import { useThemeStore } from '../../../store/themeStore';

import './RatingForm.less';
const fields = [
  { label: 'Food', name: 'food' },
  { label: 'Attractions', name: 'attractions' },
  { label: 'Transport', name: 'transport' },
  { label: 'General impression', name: 'general' },
];

type FieldNames = 'food' | 'attractions' | 'general' | 'transport';

const RatingForm = () => {
  const { review, setRating } = useReviewStore();
  const { theme } = useThemeStore();

  const onFinish = (values: Ratings) => {
    setRating(values);
  };
  return (
    <Form onFinish={onFinish} style={{ width: '50%' }}>
      {fields.map(({ label, name }, i) => {
        return (
          <Row key={i} style={{ margin: '15px auto' }}>
            <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography.Text>{label}</Typography.Text>
            </Col>
            <Col span={14} style={{ alignItems: 'center' }}>
              <Form.Item
                style={{ margin: 0 }}
                name={name}
                initialValue={review.ratings[name as FieldNames]}
                rules={[
                  { required: true, message: 'Please rate this category' },
                ]}
                hasFeedback
              >
                <Rate allowHalf className="test" key={name} />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      <Button
        data-theme={theme}
        type="primary"
        ghost
        htmlType="submit"
        style={{ float: 'right' }}
      >
        Submit
      </Button>
    </Form>
  );
};
export { RatingForm };
