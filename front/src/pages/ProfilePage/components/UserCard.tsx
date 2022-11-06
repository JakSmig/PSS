import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Progress, Space, Typography } from "antd";
 interface Props {
  userName : string;
  email: string;
 }
const UserCard = ({userName, email} :Props) => {
  return (
    <Space
      style={{
        width: "450px",
        height: "600px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Space
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderBottom: "2px solid #000",
        }}
      >
        <Avatar size={150} icon={<AntDesignOutlined />}></Avatar>
        <Typography.Text style={{ fontSize: "30px" }}>
          {userName}
        </Typography.Text>
        <Typography.Text style={{ fontSize: "20px", color: "blue" }}>
          {email}
        </Typography.Text>
      </Space>
      <Typography.Title level={2}>Statistics</Typography.Title>
      <Space style={{ display: "flex", flexDirection: "column" }}>
        <Space>
          <Progress
            type="circle"
            width={70}
            percent={40}
            format={(percent) => `${percent} / 195`}
          />
          <Typography.Title level={4}>You visited 40 capitals</Typography.Title>
        </Space>
        <Space >
          <Typography.Title>23</Typography.Title>
          <Typography.Title level={4}>You reviews 23 capitals</Typography.Title>
        </Space>
      </Space>
    </Space>
  );
};
export { UserCard };
