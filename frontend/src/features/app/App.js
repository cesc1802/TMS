import React from "react";
import { Layout } from "antd";
import HeaderPage from "../common/HeaderPage";
import SiderPage from "../common/SiderPage";
const { Content } = Layout;

export default function App({ children }) {
    return (
        <Layout className="app-container">
            <HeaderPage />
            <Layout>
                <SiderPage />
                <Layout style={{ padding: "0 15px 24px" }}>
                    <Content
                        style={{
                            background: "#fff",
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
