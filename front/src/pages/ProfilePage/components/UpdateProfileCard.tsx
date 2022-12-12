import { Button, Form, Input, Space, Typography } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteUser } from '../../../api/user';
import { Paths } from '../../../lib/enums';
import { openNotification } from '../../../lib/notifications';
import { User } from '../../../lib/types';
import { useAuthStore } from '../../../store/authStore';

const UpdateProfileCard = ({ color }: { color: string }) => {
  const { token, user, setToken } = useAuthStore();
  const navigate = useNavigate();
  const onFinish = (values: User) => {
    axios
      .post(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `http://localhost:8080/user/update?sessionToken=${token}&newUsername=${
          values.username
        }&newPassword=${values.password || ''}&newEmail=${values.email}`,
      )
      .then(user => {
        if (typeof user.data === 'string') {
          openNotification('Your credentials were successfully updated');
        }
      })
      .catch(() => null);
  };
  const handleDelete = () => {
    token && deleteUser(token);
    setToken('');
    navigate(Paths.Home);
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
        padding: '0 100px',
        boxShadow: '5px 5px 20px #000',
      }}
    >
      <Typography.Text style={{ fontSize: '34px' }}>
        Update Profile
      </Typography.Text>
      <Form
        autoComplete="false"
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        style={{ width: '250px' }}
      >
        <Form.Item
          name="username"
          label="User name"
          rules={[
            { required: true, message: 'Please enter your name' },
            { whitespace: true },
            { min: 5, message: 'User name must be min 5 characters ' },
          ]}
          initialValue={user?.username}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          initialValue={user?.email}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your email" />
        </Form.Item>
        <Form.Item name="password" label="New password">
          <Input.Password placeholder="Type your password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm new password"
          dependencies={['password']}
          initialValue=""
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords does not match');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Type your password" />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              type="default"
              danger
              style={{ marginRight: '0' }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Space>
  );
};
export { UpdateProfileCard };
