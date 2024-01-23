import { Layout } from "antd"
import { headerStyle, layoutStyle, leftContentStyle, rightContentStyle, siderStyle } from "./styles";
import { HeaderContent } from "./content/header-content";
import { SiderContent } from "./content/sider-content";
import { RightContent } from "./content/right-content";
import { MainContent } from "./content/main-content";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <HeaderContent />
      </Header>
      <Layout>
        <Sider style={siderStyle}>
          <SiderContent />
        </Sider>
        <Content style={leftContentStyle}>
          <MainContent />
        </Content>
        <Content style={rightContentStyle}>
          <RightContent />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout;