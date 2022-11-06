import { ConsoleSqlOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Typography } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../../enums";
import { useStore } from "../../hooks/useStore";
import { ModalCard } from "../ModalCard/ModalCard";
import "./Navbar.less";


const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, setToken } = useStore();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const items: MenuProps["items"] = [
    {
      label: <NavLink to={Paths.Profile}>My profile</NavLink>,
      key: "0",
    },
    {
      label: <Button onClick={()=>setToken("")}>Log out</Button>,
      key: "1",
    },
  ];

  return (
    <>
      <Header
        style={{
          backgroundColor: "transparent",
          borderBottom: "1px solid #fff",
          position: "sticky",
          display: "flex",
          justifyContent: "center",
          zIndex:2,
          alignItems: "center",
        }}
      >
        <Space
          style={{
            justifyContent: "space-between",
            width: "1200px",
          }}
        >
          <NavLink to={Paths.Home} end className="nav-link">
            <ConsoleSqlOutlined
              style={{ fontSize: "50px", color: "#fff", marginTop: "15px" }}
            />
          </NavLink>
          <Space>
            <NavLink
              to={Paths.Home}
              end
              className="nav-link"
              style={({ isActive }) => ({
                borderBottom: isActive ? "2px solid #1DA57A" : "none",
                color: isActive ? "#1DA57A" : "white",
              })}
            >
              Home
            </NavLink>
            <NavLink
              to={Paths.Map}
              className="nav-link"
              style={({ isActive }) => ({
                borderBottom: isActive ? "2px solid #1DA57A" : "none",
                color: isActive ? "#1DA57A" : "white",
              })}
            >
              Map
            </NavLink>
            {token ?
            <Dropdown menu={{ items }} trigger={["click"]}>
              <SmileOutlined style={{ fontSize: "30px" }} />
            </Dropdown> :
            <Typography.Text className="login-button" onClick={showModal}>
              LOG IN
            </Typography.Text>}
          </Space>
        </Space>
      </Header>
      {isModalOpen && <ModalCard close={hideModal} />}
    </>
  );
};
export { Navbar };
