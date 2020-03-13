import React from "react";
import { Modal, Form, Input, Select } from "antd";

const GrantForm = Form.create({ name: "grant_form" })(props => {
    const {
        visible,
        handleCancel,
        handleOk,
        form,
        isLoading,
        roleDropdown,
        permissionDropdown
    } = props;
    const { getFieldDecorator } = form;

    return (
        <React.Fragment>
            <Modal
                title="Grant"
                visible={visible}
                onOk={handleOk}
                confirmLoading={isLoading}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label="Role">
                        {getFieldDecorator("roleId", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select role !"
                                }
                            ]
                        })(roleDropdown)}
                    </Form.Item>

                    <Form.Item label="Permission">
                        {getFieldDecorator("permissionId", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select permission !!!"
                                }
                            ]
                        })(permissionDropdown)}
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
});

const renderDropdown = props => {
    const { label, dataList } = props;
    return dataList ? (
        <Select placeholder={label}>
            {dataList.map((data, index) => {
                return (
                    <Select.Option key={index} value={data.id}>
                        {data[`${label}_name`]}
                    </Select.Option>
                );
            })}
        </Select>
    ) : (
        <Select></Select>
    );
};

const renderPermisssionDropdown = props => {
    const { dataList } = props;
    return dataList ? (
        <Select placeholder="Permission">
            {dataList.map((data, index) => {
                return (
                    <Select.Option key={index} value={data.id}>
                        {`${data.resource} - ${data.action}`}
                    </Select.Option>
                );
            })}
        </Select>
    ) : (
        <Select></Select>
    );
};

const ModalGrant = props => {
    const {
        visible,
        handleCancel,
        handleOk,
        saveFormRef,
        allRoles,
        allPermission
    } = props;

    const roleDropdown = renderDropdown({
        label: "role",
        dataList: allRoles
    });

    const permissionDropdown = renderPermisssionDropdown({
        dataList: allPermission
    });

    return (
        <GrantForm
            ref={saveFormRef}
            roleDropdown={roleDropdown}
            permissionDropdown={permissionDropdown}
            visible={visible}
            handleOk={handleOk}
            handleCancel={handleCancel}
        ></GrantForm>
    );
};

export default ModalGrant;
