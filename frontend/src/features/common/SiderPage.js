import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;
const SiderPage = () => {
    return (
        <Sider width={250} style={{ background: "#fff" }}>
            <Menu
                mode="inline"
                // defaultSelectedKeys={["1"]}
                // defaultOpenKeys={["Home"]}
                style={{ height: "100vh", borderRight: 0 }}
            >
                <SubMenu
                    key="home"
                    title={
                        <span>
                            <Icon type="home" />
                            Home
                        </span>
                    }
                >
                    <Menu.Item key="1">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="terminal"
                    title={
                        <span>
                            <Icon type="laptop" />
                            Terminal Parameter
                        </span>
                    }
                >
                    <Menu.Item key="2">
                        <Link to="/parameters">Parameters</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="security"
                    title={
                        <span>
                            <Icon type="notification" />
                            Security
                        </span>
                    }
                >
                    <Menu.Item key="3">
                        <Link to="/settings">Settings</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export default SiderPage;
