import './AuthModal.less';

import { CloseOutlined } from '@ant-design/icons';
import { Row, Space, Typography } from 'antd';
import React, { useState } from 'react';

import { useModalStore } from '../../store/modalStore';
import { useThemeStore } from '../../store/themeStore';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';

enum Forms {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

const ModalCard = () => {
  const [form, setForm] = useState(Forms.SignIn);

  const { theme } = useThemeStore();
  const { setModal } = useModalStore();

  const color = theme === 'light' ? '#1DA57A' : '#DA627D';

  return (
    <div className="modal">
      <span
        className="background"
        onClick={() => setModal(false)}
        aria-hidden="true"
      />
      <Space.Compact
        className="modal-card"
        style={{
          border: `3px solid ${color}`,
          background:
            theme === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(33, 20, 46 ,0.9)',
        }}
      >
        <Space style={{ display: 'flex', width: '100%' }}>
          <CloseOutlined
            onClick={() => setModal(false)}
            style={{ margin: '5px', fontSize: '20px' }}
          />
        </Space>
        <Row style={{ margin: '0px auto 30px' }}>
          <Typography.Text
            data-theme={theme}
            className="nav-button"
            onClick={() => setForm(Forms.SignIn)}
            style={
              form === Forms.SignIn
                ? {
                    color,
                    borderBottom: `2px solid ${color}`,
                    cursor: 'pointer',
                    opacity: 1,
                  }
                : {}
            }
          >
            Log In
          </Typography.Text>
          <Typography.Text
            className="nav-button"
            onClick={() => setForm(Forms.SignUp)}
            style={
              form === Forms.SignUp
                ? {
                    color,
                    borderBottom: `2px solid ${color}`,
                    cursor: 'pointer',
                    opacity: 1,
                  }
                : {}
            }
          >
            Sign Up
          </Typography.Text>
        </Row>
        <Space
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {form === Forms.SignIn ? <SignInForm /> : <SignUpForm />}
        </Space>
      </Space.Compact>
    </div>
  );
};
export { ModalCard };
