import { Button, Form, Input } from "antd";
import React from "react";
import axios from 'axios';
import { useStore } from "../../hooks/useStore";

const SignInForm = () => {
  const { setToken} = useStore();
  const onFinish = (values: any) => {
    axios
    .post(
      `http://localhost:8080/user/login?email=${values.email}&password=${values.password}`,
    )
    .then(user => {
      if (typeof user.data === 'string') {
        console.log(user.data)
        setToken(user.data)
      }
    })
    .catch(() => {});
  };

  return (
    <Form
      layout="vertical"
      name="nest-messages"
      onFinish={onFinish}
      autoComplete="off"
      style={{width: "250px"}}
    >
      <Form.Item
        name= "email"
        label="Email"
        rules={[
          {required : true,
          message: "Please enter your email"},
          {type: "email", message: "Please enter a valid email"},
        ]}
        hasFeedback
      >
        <Input placeholder="Type your email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {required : true, message: "Please enter password"},
          {min: 6, message : "Password must be min 6 characters "}
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Type your password"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { SignInForm };
