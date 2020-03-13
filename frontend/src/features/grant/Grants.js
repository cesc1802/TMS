import React, { useEffect, useState, useCallback } from "react";
import { TableWrapper } from "../common";
import ModalGrants from "./ModalGrants";
import {
    useFetchGrantList,
    useCreateGrant,
    useDeleteGrant
} from "./redux/hooks";

import { useFetchAllRoles } from "../role/redux/hooks";
import { useFetchPermissions } from "../permission/redux/hooks";

const Grants = props => {
    const [visible, setVisible] = useState(false);
    const [formRef, setFormRef] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const pageSize = 4;

    const { grantList, totalRecord, fetchGrantList } = useFetchGrantList();
    const { allRoles, fetchAllRoles } = useFetchAllRoles();
    const { allPermission, fetchPermissions } = useFetchPermissions();

    const { createGrant, isSuccessed } = useCreateGrant();
    const { deleteGrant } = useDeleteGrant();

    useEffect(() => {
        fetchGrantList({ page: 0, pageSize });
    }, []);

    useEffect(() => {
        fetchAllRoles();
    }, []);

    useEffect(() => {
        fetchPermissions();
    }, []);

    useEffect(() => {
        hideModal();
    }, [isSuccessed]);

    let dataSource = null;
    if (grantList !== null) {
        dataSource = [...grantList];
        dataSource.map(data => {
            data["key"] = data.id;
        });
    }

    const columns = [
        {
            title: "Role Name",
            dataIndex: "role_name",
            key: "role_name"
        },
        {
            title: "Resource",
            dataIndex: "resource",
            key: "resource"
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action"
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at"
        }
    ];

    const onChangePage = (page, pageSize) => {
        fetchGrantList({ page: page - 1, pageSize });
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
            createGrant({
                roleId: values.roleId,
                permissionId: values.permissionId
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
        deleteGrant({ ids: selectedRowKeys });
    };

    return (
        <React.Fragment>
            <TableWrapper
                dataSource={grantList}
                columns={columns}
                pages={{
                    total: totalRecord,
                    pageSize,
                    onChange: onChangePage
                }}
                showModal={showModal}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: e => {
                            setVisible(true);
                        }
                    };
                }}
                onDeleteRows={onDeleteRows}
                rowSelection={rowSelection}
            />
            {visible && (
                <ModalGrants
                    visible={visible}
                    allRoles={allRoles}
                    allPermission={allPermission}
                    saveFormRef={saveFormRef}
                    handleOk={handleSubmit}
                    handleCancel={handleCancel}
                />
            )}
        </React.Fragment>
    );
};

export default Grants;
