import React, { useState, useCallback } from "react";
import { Modal, Form, Input, Select } from "antd";

const PermissionForm = Form.create({ name: "permission_form" })(props => {
    const {
        visible,
        handleCancel,
        handleOk,
        resourceDropdown,
        actionDropdown,
        form
    } = props;
    const { getFieldDecorator } = form;
    const getRules = (options = {}) => {
        return [
            {
                required: options.required,
                message: options.message
            }
        ];
    };
    return (
        <React.Fragment>
            <Modal
                title="Permission"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label="Resource">
                        {getFieldDecorator("resource", {
                            rules: getRules({
                                required: true,
                                message: "Please select resource!"
                            })
                        })(resourceDropdown)}
                    </Form.Item>

                    <Form.Item label="Action">
                        {getFieldDecorator("action", {
                            rules: getRules({
                                required: true,
                                message: "Please select action"
                            })
                        })(actionDropdown)}
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
                    <Select.Option key={index} value={data[`${label}_name`]}>
                        {data[`${label}_name`]}
                    </Select.Option>
                );
            })}
        </Select>
    ) : (
        <Select></Select>
    );
};

const ModalPermission = props => {
    const {
        visible,
        handleCancel,
        handleOk,
        saveFormRef,
        resourceList,
        actionList
    } = props;

    const actionDropdown = renderDropdown({
        label: "action",
        dataList: actionList
    });

    const resourceDropdown = renderDropdown({
        label: "resource",
        dataList: resourceList
    });
    return (
        <PermissionForm
            ref={saveFormRef}
            visible={visible}
            resourceDropdown={resourceDropdown}
            actionDropdown={actionDropdown}
            handleOk={handleOk}
            handleCancel={handleCancel}
        ></PermissionForm>
    );
};

export default ModalPermission;
