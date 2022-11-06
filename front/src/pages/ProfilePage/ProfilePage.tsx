import { Menu, MenuProps, Space } from "antd";
import Sider from "antd/lib/layout/Sider"
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { UpdateProfileCard } from "./components/UpdateProfileCard";
import { UserCard } from "./components/UserCard";

// 42273B
const items2: MenuProps['items'] = ['Info', 'Capitals', 'Reviews'].map(key => ({
  key,
  label: `${key}`,
}));

const ProfilePage =  () => {
  const { user } = useCurrentUser(); 

  if (!user) {
    return <div>loading...</div>;
  }
  
  return (
    <Space style={{backgroundColor: "#70566D", height: "100vh", width: "100%", marginTop: "-64px"}}>
    <Sider width={300} style={{height: "calc(100vh-64px)", backgroundColor: "#42273B"}}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['Info']}
          defaultOpenKeys={['Info']}
          style={{ height: '100%', borderRight: 0 }}
          items={items2}        
        />
      </Sider>
      <Space style={{ height: "100vh", width: "100%"}}>
        <UserCard userName={user.username} email={user.email}/>
        <UpdateProfileCard/>
        </Space>
    </Space>
  )
}

export {ProfilePage}