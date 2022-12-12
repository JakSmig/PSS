import './ReviewForm.less';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Space, Steps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { postReview } from '../../api/review';
import { openNotification } from '../../lib/notifications';
import { useAuthStore } from '../../store/authStore';
import { useReviewStore } from '../../store/reviewStore';
import { useThemeStore } from '../../store/themeStore';
import { RatingForm } from './Rating/RatingForm';
import { TextReviewForm } from './TextReview/TextReviewForm';
import { UploadForm } from './Upload/UploadForm';

const steps = [
  {
    title: 'Rating',
    content: <RatingForm />,
  },
  {
    title: 'Review',
    content: <TextReviewForm />,
  },
  {
    title: 'Upload images',
    content: <UploadForm />,
  },
];
const ReviewForm = ({
  capitalName,
  closeModal,
}: {
  capitalName: string;
  closeModal: () => void;
}) => {
  const [current, setCurrent] = useState(0);
  const { token } = useAuthStore();
  const { review, setReview } = useReviewStore();
  const { theme } = useThemeStore();

  const mutation = useMutation({
    mutationFn: postReview,
  });

  const color = theme === 'light' ? '#fff' : '#452861';
  const next = () => {
    setCurrent(current + 1);
  };

  useEffect(() => {
    if (mutation.data) {
      closeModal();
    }
  }, [mutation.data, closeModal]);

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));
  return (
    <div className="modal">
      <span className="background" aria-hidden="true" />
      <Space.Compact
        direction="vertical"
        data-theme={theme}
        className="card"
        style={{
          backgroundColor: color,
        }}
      >
        <Space style={{ display: 'flex', width: '100%' }}>
          <CloseOutlined
            onClick={() => {
              closeModal();
              setReview();
            }}
            style={{ margin: '5px', fontSize: '20px' }}
          />
        </Space>
        <Typography.Text style={{ fontSize: '24px' }}>
          Adding review to capital: {capitalName}
        </Typography.Text>
        <Steps
          data-theme={theme}
          current={current}
          items={items}
          style={{ margin: '30px auto' }}
        />
        {steps[current].content}
        <div className="steps-action">
          {current > 0 && (
            <Button
              data-theme={theme}
              style={{ margin: '0 8px' }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              type="primary"
              data-theme={theme}
              onClick={() => next()}
              style={{ marginRight: 0 }}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                openNotification('Your review was added sucsessfully!');
                token &&
                  mutation.mutate({
                    token,
                    review,
                    capital: capitalName,
                  });
                setReview();
              }}
            >
              Done
            </Button>
          )}
        </div>

        <Form />
      </Space.Compact>
    </div>
  );
};
export { ReviewForm };
