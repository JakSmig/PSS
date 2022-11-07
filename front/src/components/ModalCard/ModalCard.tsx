import { CloseOutlined } from "@ant-design/icons";
import { Row, Space, Typography } from "antd";
import { useState } from "react";
import "./ModalCard.less";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

enum Forms {
  SignIn = "signIn",
  SignUp = "signUp",
}
const ModalCard = ({close} : any) => {
  const [form, setForm] = useState(Forms.SignIn);
  return (
    <Space className="card-display"
    >
      <Space.Compact
        direction="vertical"
        style={{
          height: "600px",
          width: "380px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: "3px solid rgba(49, 99, 83, 0.6)",
          borderRadius: "5px",
          alignItems: "center",
        }}
      >
        <Space style={{display: "flex",  width: "100%"}}>
        <CloseOutlined onClick={close} style={{margin: "5px", fontSize: "20px"}}/> 
        </Space>
        <Row style={{margin: "30px auto"}}>
          <Typography.Text className="nav-button"
            onClick={() => setForm(Forms.SignIn)}
            style={{color: form === Forms.SignIn? "#1DA57A" : "black",
          borderBottom: form === Forms.SignIn? "2px solid #1DA57A" : "none", cursor :"pointer"}}
            
          >
            Log In
          </Typography.Text>
          <Typography.Text className="nav-button"
            onClick={() => setForm(Forms.SignUp)}
            style={{color: form === Forms.SignUp? "#1DA57A" : "black",
            borderBottom: form === Forms.SignUp? "2px solid #1DA57A" : "none", cursor :"pointer"}}
          >
            Sign Up
          </Typography.Text>
        </Row>
        <Space style={{alignItems: "center" , justifyContent: "center", height:"100%"}}>
        {form === Forms.SignIn ? <SignInForm /> : <SignUpForm />}
        </Space>
      </Space.Compact>
    </Space>
  );
};
export { ModalCard };
