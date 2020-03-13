import React, { useEffect, useState, useCallback } from "react";
import { TableWrapper } from "../common";
import ModalPermission from "./ModalPermission";
import {
    useFetchPermissionList,
    useCreatePermission,
    useDeletePermission
} from "./redux/hooks";
import { useFetchActionList } from "../action/redux/hooks";
import { useFetchResourceList } from "../resources/redux/hooks";

const Permissions = props => {
    const [visible, setVisible] = useState(false);
    const [formRef, setFormRef] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const pageSize = 4;

    const {
        permissionList,
        totalRecord,
        fetchPermissionList
    } = useFetchPermissionList();

    const { isSuccessed, createPermission } = useCreatePermission();
    const { deletePermission } = useDeletePermission();
    const { actionList, fetchActionList } = useFetchActionList();
    const { resourceList, fetchResourceList } = useFetchResourceList();

    useEffect(() => {
        fetchPermissionList({ page: 0, pageSize });
    }, []);

    useEffect(() => {
        fetchActionList();
    }, []);

    useEffect(() => {
        fetchResourceList();
    }, []);

    useEffect(() => {
        hideModal();
    }, [isSuccessed]);

    const columns = [
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

    let dataSource = null;
    if (permissionList !== null) {
        dataSource = [...permissionList];
        dataSource.map(data => {
            data["key"] = data.id;
        });
    }
    const onChangePage = (page, pageSize) => {
        fetchPermissionList({ page: page - 1, pageSize });
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
            createPermission({
                resource: values.resource,
                action: values.action
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
        deletePermission({ ids: selectedRowKeys });
    };

    return (
        <React.Fragment>
            <TableWrapper
                dataSource={permissionList}
                columns={columns}
                pages={{
                    total: totalRecord,
                    pageSize,
                    onChange: onChangePage
                }}
                showModal={showModal}
                // onRow={(record, rowIndex) => {
                //     return {
                //         onDoubleClick: e => {
                //             setVisible(true);
                //         }
                //     };
                // }}
                onDeleteRows={onDeleteRows}
                rowSelection={rowSelection}
            />
            {visible && (
                <ModalPermission
                    visible={visible}
                    actionList={actionList}
                    resourceList={resourceList}
                    saveFormRef={saveFormRef}
                    handleOk={handleSubmit}
                    handleCancel={handleCancel}
                />
            )}
        </React.Fragment>
    );
};

export default Permissions;
