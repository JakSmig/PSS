import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Comment,
  Image,
  Modal,
  Rate,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { QueryObserverBaseResult } from 'react-query';

import { reportComment } from '../../api/report';
import { likeReview } from '../../api/review';
import { ReviewDB } from '../../lib/types';
import './CommentCard.less';
const CommentCard = ({
  review,
  token,
  onRefetch,
}: { review: ReviewDB } & { token: string } & {
  onRefetch: QueryObserverBaseResult['refetch'];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const like = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    likeReview({
      commentId: review.id,
      value: review.likedByCurrentUser === 1 ? '0' : '1',
      token,
    }).then(() => onRefetch());
  };
  const dislike = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    likeReview({
      commentId: review.id,
      value: review.likedByCurrentUser === -1 ? '0' : '-1',
      token,
    }).then(() => onRefetch());
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reportComment({ commentID: review.id, reasonText: '', token });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const data = {
    actions: [
      <Tooltip key="comment-basic-like" title="Like">
        <div style={{ display: 'flex' }}>
          <span className="comment-action">{review.likeRatio}</span>
          <div onClick={like} onKeyDown={like} role="presentation">
            {React.createElement(
              review.likedByCurrentUser === 1 ? LikeFilled : LikeOutlined,
            )}
          </div>
        </div>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <div onClick={dislike} onKeyDown={like} role="presentation">
          {React.createElement(
            review.likedByCurrentUser === -1 ? DislikeFilled : DislikeOutlined,
          )}
        </div>
      </Tooltip>,
      <Button
        key={1}
        type="text"
        style={{
          color: 'red',
          fontSize: '12px',
          marginLeft: '100px',
        }}
        onClick={showModal}
      >
        Report comment
      </Button>,
    ],
    author: 'Han Solo',
    avatar: review.userAvatar ? review.userAvatar.value : <UserOutlined />,
    content: (
      <Space.Compact direction="vertical">
        <div>
          <span style={{ color: '#c1c1c1' }}> General impression </span>
          <Rate disabled defaultValue={review.ratingGeneral} />
        </div>
        <Typography.Paragraph>{review.cText}</Typography.Paragraph>
        {review.imageLocation && (
          <Image src={review.imageLocation.value} alt="mem" width={250} />
        )}
      </Space.Compact>
    ),
    datetime: (
      <Tooltip title="2016-11-22 11:22:33">
        <span>
          {moment.utc(review.creationTime).local().startOf('seconds').fromNow()}
        </span>
      </Tooltip>
    ),
  };
  return (
    <>
      <Comment
        actions={data.actions}
        author={review.user}
        avatar={data.avatar}
        content={data.content}
        datetime={data.datetime}
        style={{
          width: '350px',
          padding: '0 20px',
          margin: '20px auto',
        }}
      />
      <Modal
        key={1}
        title="Report this comment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Report"
      >
        <p>
          You claim that this comment contains incorrect information or
          unreliable pictures
        </p>
      </Modal>
    </>
  );
};
export { CommentCard };
