import { Input } from 'antd';
import React from 'react';

import { useReviewStore } from '../../../store/reviewStore';

import './TextReviewForm.less';
const TextReviewForm = () => {
  const { review, setText } = useReviewStore();
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setText(e.target.value);
  };
  return (
    <>
      <Input.TextArea
        placeholder="Type your experience"
        showCount
        rows={6}
        maxLength={500}
        style={{ width: '500px' }}
        onChange={onChange}
        value={review.text}
      />
    </>
  );
};

export { TextReviewForm };
