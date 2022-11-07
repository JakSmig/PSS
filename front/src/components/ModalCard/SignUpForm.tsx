import { Button, Form, Input } from "antd";
import React from "react";
import axios from 'axios';


const SignUpForm = () => {
  const onFinish = (values: any) => {
    axios
    .post(
      `http://localhost:8080/user/add?username=${values.userName}&email=${values.email}&password=${values.password}`,
    )
    .then(user => {console.log(user.data)})
    .catch(() => {});
  };

  return (
    <Form
      layout="vertical"
      name="nest-messages"
      onFinish={onFinish}
      style={{width: "250px"}}
    >
      <Form.Item
        name= "userName"
        label="User name"
        rules={[
          {required : true,
          message: "Please enter your name"},
        {whitespace: true},
        {min: 5, message : "User name must be min 5 characters "}
        ]}
        hasFeedback
      >
        <Input placeholder="Type your name" />
      </Form.Item>
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
          {required : true,},
          {min: 6, message : "Password must be min 6 characters "}
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Type your password"/>
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm password"
        dependencies={['password']}
        rules={[
          {required : true,},
          ({getFieldValue})=>({
            validator(_,value){
              if(!value || getFieldValue('password') === value){
                return Promise.resolve()
              }
              return Promise.reject("The two passwords does not match")
            }
          })
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

export { SignUpForm };
