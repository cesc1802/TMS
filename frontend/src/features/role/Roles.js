import React, { useEffect } from "react";
import { TableWrapper } from "../common";
import { useFetchRoleList } from "./redux/hooks";

const Roles = props => {
    const { roleList, totalRecord, fetchRoleList } = useFetchRoleList();
    useEffect(() => {
        fetchRoleList({ page: 0, pageSize: 4 });
        console.log("render one times");
    }, []);
    const columns = [
        {
            title: "Role",
            dataIndex: "role",
            key: "role"
        }
    ];

    const data = [
        {
            key: "1",
            role: "John Brown"
        },
        {
            key: "2",
            role: "Jim Green"
        },
        {
            key: "3",
            role: "Joe Black"
        }
    ];
    return <TableWrapper dataSource={data} columns={columns} />;
};

export default Roles;
