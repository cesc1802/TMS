import React from "react";
import { Roles } from "../role";
import { Permissions } from "../permission";
import { Grants } from "../grant";
import { Users } from "../user";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Security = () => {
    function callback(key) {
        console.log("TabPanel Security", key);
    }
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Users" key="1">
                <Users />
            </TabPane>
            <TabPane tab="Roles" key="2">
                <Roles />
            </TabPane>
            <TabPane tab="Permissions" key="3">
                <Permissions />
            </TabPane>
            <TabPane tab="Grants" key="4">
                <Grants />
            </TabPane>
        </Tabs>
    );
};

export default Security;
