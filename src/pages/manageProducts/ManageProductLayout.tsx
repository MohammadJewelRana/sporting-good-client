import { Outlet } from "react-router-dom";

import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Header } from "antd/es/layout/layout";

const { Content } = Layout;

const ManageProductLayout = () => {
  return (
    <div>
      <Layout className="h-screen">
        <Sidebar></Sidebar>

        <Layout>
          <Header style={{ padding: 0 }} />
          <Content>
            <div className="p-6 min-h-[360px]">
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ManageProductLayout;
