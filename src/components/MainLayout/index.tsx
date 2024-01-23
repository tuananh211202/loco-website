import { Layout } from "antd"
import { headerStyle, layoutStyle, leftContentStyle, rightContentStyle, siderStyle } from "./styles";
import { HeaderContent } from "./content/header-content";
import { SiderContent } from "./content/sider-content";
import { RightContent } from "./content/right-content";
import { MainContent } from "./content/main-content";
import { useEffect, useRef, useState } from "react";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const firstContentRef = useRef<HTMLElement>(null);
  const secondContentRef = useRef<HTMLElement>(null);
  const [firstWidth, setFirstWidth] = useState(0);
  const [secondWidth, setSecondWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if(firstContentRef) {
        setFirstWidth(firstContentRef.current?.clientWidth ?? 0);
      }
      if(secondContentRef) {
        setSecondWidth(secondContentRef.current?.clientWidth ?? 0);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <HeaderContent firstWidth={firstWidth} secondWidth={secondWidth} />
      </Header>
      <Layout>
        <Sider style={siderStyle}>
          <SiderContent />
        </Sider>
        <Content style={leftContentStyle} ref={firstContentRef}>
          <MainContent />
        </Content>
        <Content style={rightContentStyle} ref={secondContentRef}>
          <RightContent />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout;