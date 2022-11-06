import { Content } from "antd/lib/layout/layout";
import Img from "./../../images/fon.jpg";

const HomePage = () => {
  return (
    <Content
      style={{
        backgroundImage: `url(${Img})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        marginTop:"-64px",
        paddingTop: "64px"
      }}
    >
      <h1>page</h1>
    </Content>
  );
};

export { HomePage };
