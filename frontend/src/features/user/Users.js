import React, { useEffect, useState, useCallback } from "react";
import { TableWrapper } from "../common";
import ModalUser from "./ModalUser";
import { useFetchAllRoles } from "../role/redux/fetchAll";
import { useFetchUserList } from "./redux/hooks";
import { useDeleteUser } from "./redux/hooks";
import { useCreateUser } from "./redux/hooks";

const Users = props => {
    const [visible, setVisible] = useState(false);
    const [formRef, setFormRef] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const pageSize = 4;

    const { userList, totalRecord, fetchUserList } = useFetchUserList();
    const { allRoles, fetchAllRoles } = useFetchAllRoles();
    const { deleteUsers } = useDeleteUser();
    const { isSuccessed, createUser } = useCreateUser();

    useEffect(() => {
        fetchUserList({ page: 0, pageSize });
    }, []);

    // useEffect(() => {
    //     fetchActionList();
    // }, []);

    // useEffect(() => {
    //     fetchResourceList();
    // }, []);

    useEffect(() => {
        fetchAllRoles();
    }, []);

    useEffect(() => {
        hideModal();
    }, [isSuccessed]);

    const columns = [
        {
            title: "UserName",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "Role",
            dataIndex: "role_name",
            key: "role_name"
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at"
        }
    ];

    let dataSource = null;
    if (userList !== null) {
        dataSource = [...userList];
        dataSource.map(data => {
            data["key"] = data.id;
        });
    }
    const onChangePage = (page, pageSize) => {
        fetchUserList({ page: page - 1, pageSize });
    };

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleSubmit = () => {
        formRef.validateFields((err, values) => {
            if (err) return;
            createUser({
                username: values.username,
                password: values.password,
                roleId: values.roleId
            });
        });
    };
    const saveFormRef = useCallback(form => {
        if (form !== null) setFormRef(form);
    });

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        onChange: onSelectChange
    };

    const onDeleteRows = () => {
        deleteUsers({ ids: selectedRowKeys });
    };

    return (
        <React.Fragment>
            <TableWrapper
                dataSource={userList}
                columns={columns}
                pages={{
                    total: totalRecord,
                    pageSize,
                    onChange: onChangePage
                }}
                showModal={showModal}
                onDeleteRows={onDeleteRows}
                rowSelection={rowSelection}
            />
            {visible && (
                <ModalUser
                    visible={visible}
                    allRoles={allRoles}
                    saveFormRef={saveFormRef}
                    handleOk={handleSubmit}
                    handleCancel={handleCancel}
                />
            )}
        </React.Fragment>
    );
};

export default Users;
