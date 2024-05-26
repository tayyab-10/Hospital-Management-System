import React from "react";
import { Button, Layout, Menu, theme } from "antd";
import { useMediaQuery } from "react-responsive";
const { Header, Sider, Content } = Layout;

const PageWrapper = ({
  SidebarComponent,
  HeaderComponent,
  SectionComponent,
  componentName,
}) => {
  let mobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <Layout className="xl:h-[100vh] md:h-[100%] ">
      {!mobile && (
        <Sider
          style={{
            background:
              "linear-gradient(to top left, rgba(255, 255, 255, 2), #4e3ebb)",
          }}
          width={250}
        >
          <SidebarComponent />
        </Sider>
      )}
      <Layout className="">
        <Header className="bg-transparent">
          <HeaderComponent />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <h1 className="text-bold ml-10 font-bold text-2xl mb-10">
              {componentName} Settings
            </h1>
            <SectionComponent />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageWrapper;
