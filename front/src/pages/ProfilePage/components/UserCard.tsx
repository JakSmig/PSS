import { AntDesignOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Image,
  Modal,
  Progress,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getAllAvatars } from '../../../api/avatar';
import { getReviewsForUser } from '../../../api/review';
import { getAllCapitalsForUserStatus } from '../../../api/status';
import { changeAvatar } from '../../../api/user';
import { CapitalStatus } from '../../../lib/types';
import { useAuthStore } from '../../../store/authStore';
import { useThemeStore } from '../../../store/themeStore';
import './UserCard.less';

const UserCard = ({ color }: { color: string }) => {
  const { theme } = useThemeStore();
  const { user, token } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<number>();
  const avatars = useQuery({
    queryFn: () => getAllAvatars(),
  });
  const capitals = useQuery({
    queryKey: ['capitalsStatus', ['VISITED', token]],
    queryFn: () =>
      getAllCapitalsForUserStatus({
        status: 'VISITED' as unknown as CapitalStatus,
        token: token || '',
      }),
    enabled: !!token,
  });
  const reviews = useQuery({
    queryKey: ['userReviews', [token]],
    queryFn: () =>
      getReviewsForUser({
        token: token || '',
      }),
    enabled: !!token,
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    changeAvatar({ token: token as string, avatarId: image as number });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const selectImage = (id: number) => {
    setImage(id);
  };
  return (
    <Space
      style={{
        height: '500px',
        backgroundColor: color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 50px',
        boxShadow: '5px 5px 20px #000',
      }}
    >
      <Space
        style={{
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderBottom: theme === 'light' ? '2px solid #000' : '2px solid #fff',
        }}
      >
        {user?.avatar ? (
          <Avatar size={150} src={user?.avatar.value} />
        ) : (
          <Avatar size={150} icon={<AntDesignOutlined />} />
        )}

        <Button type="primary" onClick={showModal}>
          Change avatar
        </Button>
        <Modal
          title="Change avatar"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Space
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {avatars.data?.map(avatar => (
              <Image
                id={String(avatar.id)}
                src={avatar.value}
                key={avatar.id}
                preview={false}
                onClick={() => selectImage(avatar.id)}
                height={120}
                width={120}
                style={avatar.id === image ? { border: '1px solid green' } : {}}
              />
            ))}
          </Space>
        </Modal>
        <Typography.Text style={{ fontSize: '40px', fontWeight: 700 }}>
          {user?.username}
        </Typography.Text>
        <Typography.Text style={{ fontSize: '20px', color: '#77b0f2' }}>
          {user?.email}
        </Typography.Text>
      </Space>
      <Typography.Text style={{ fontSize: '30px' }}>Statistics</Typography.Text>
      <Space style={{ display: 'flex', flexDirection: 'column' }}>
        <Space>
          {capitals.data && (
            <>
              <Progress
                type="circle"
                width={70}
                percent={(capitals.data?.length / 195) * 100}
                format={percent => `${capitals.data?.length} / 195`}
              />
              <Typography.Text style={{ fontSize: '22px' }}>
                You visited {capitals.data?.length} capitals
              </Typography.Text>
            </>
          )}
        </Space>
        <Space>
          {reviews.data && (
            <>
              <Typography.Text>{reviews.data.length}</Typography.Text>
              <Typography.Text style={{ fontSize: '22px' }}>
                You review {reviews.data.length} capitals
              </Typography.Text>
            </>
          )}
        </Space>
      </Space>
    </Space>
  );
};
export { UserCard };
