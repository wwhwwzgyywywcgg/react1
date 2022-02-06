import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  ProjectOutlined,
  BankOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Route, useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
import ProductCategories from "./Products/Categories";
import Users from "./Users";
import Orders from "./Users/Orders";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const { push } = useHistory();
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div className="logo">TG</div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            onClick={({ key }) => {
              push(key); // 点击菜单之后实现跳转
            }}
          >
            <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
              看板
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
              <Menu.Item key="/admin/users">用户信息</Menu.Item>
              <Menu.Item key="/admin/orders">订单管理</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<ProjectOutlined />} title="商品管理">
              <Menu.Item key="/admin/product_categories">商品分类</Menu.Item>
              <Menu.Item key="/admin/products">商品信息</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "8px 16px" }}>
            <Route path="/admin/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin/users">
              <Users />
            </Route>
            <Route path="/admin/orders">
              <Orders />
            </Route>
            <Route path="/admin/product_categories">
              <ProductCategories />
            </Route>
            <Route path="/admin/products">
              <Products />
            </Route>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            TG ©2022 Created by TG TEAM
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Main;
