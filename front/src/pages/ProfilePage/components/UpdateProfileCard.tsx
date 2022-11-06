import { Button, Form, Input, Space, Typography } from "antd"

const UpdateProfileCard = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return(
    <Space 
    style={{
      width: "700px",
      height: "600px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography.Title>Update Profile</Typography.Title>
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  </Space>
  )
}
export {UpdateProfileCard}