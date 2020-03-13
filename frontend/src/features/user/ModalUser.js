import React, { useState, useCallback } from "react";
import { Modal, Form, Input, Select } from "antd";

const UserForm = Form.create({ name: "user_form" })(props => {
    const { visible, handleCancel, handleOk, form, roleDropdown } = props;
    const { getFieldDecorator } = form;

    return (
        <React.Fragment>
            <Modal
                title="User"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label="Username">
                        {getFieldDecorator("username", {
                            rules: [
                                {
                                    required: true,
                                    validator: async (
                                        rule,
                                        value,
                                        callback
                                    ) => {
                                        try {
                                            if (value === undefined) {
                                                form.setFields({
                                                    username: {
                                                        errors: [
                                                            new Error(
                                                                "Please input your username !!!"
                                                            )
                                                        ]
                                                    }
                                                });
                                            }
                                        } catch (err) {
                                            callback(err);
                                        }
                                    }
                                }
                            ]
                        })(<Input placeholder="Username" type="text"></Input>)}
                    </Form.Item>

                    <Form.Item label="Password">
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(
                            <Input.Password
                                placeholder="Your Password"
                                type="text"
                            ></Input.Password>
                        )}
                    </Form.Item>

                    <Form.Item label="Confirm Password">
                        {getFieldDecorator("confirm", {
                            rules: [
                                {
                                    required: true,
                                    validator: async (
                                        rule,
                                        value,
                                        callback
                                    ) => {
                                        try {
                                            const password = form.getFieldValue(
                                                "password"
                                            );
                                            if (password === undefined) {
                                                form.setFields({
                                                    password: {
                                                        errors: [
                                                            new Error(
                                                                "Please input your password !!!"
                                                            )
                                                        ]
                                                    }
                                                });
                                            }

                                            if (value === undefined) {
                                                form.setFields({
                                                    confirm: {
                                                        errors: [
                                                            new Error(
                                                                "Please input your password !!!"
                                                            )
                                                        ]
                                                    }
                                                });
                                            }

                                            if (password !== value) {
                                                throw new Error(
                                                    "Please input correct password !!!"
                                                );
                                            }
                                        } catch (err) {
                                            callback(err);
                                        }
                                    }
                                }
                            ]
                        })(
                            <Input.Password
                                placeholder="Confirm Password"
                                type="text"
                            ></Input.Password>
                        )}
                    </Form.Item>
                    <Form.Item label="Role">
                        {getFieldDecorator("roleId", {
                            rules: [
                                {
                                    required: true,
                                    validator: async (
                                        rule,
                                        value,
                                        callback
                                    ) => {
                                        try {
                                            if (value === undefined) {
                                                form.setFields({
                                                    roleId: {
                                                        errors: [
                                                            new Error(
                                                                "Please select a Role !!!"
                                                            )
                                                        ]
                                                    }
                                                });
                                            }
                                        } catch (err) {
                                            callback(err);
                                        }
                                    }
                                }
                            ]
                        })(roleDropdown)}
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

const ModalUser = props => {
    const { visible, handleCancel, handleOk, saveFormRef, allRoles } = props;

    const roleDropdown = renderDropdown({
        label: "role",
        dataList: allRoles
    });

    return (
        <UserForm
            ref={saveFormRef}
            visible={visible}
            roleDropdown={roleDropdown}
            handleOk={handleOk}
            handleCancel={handleCancel}
        ></UserForm>
    );
};

export default ModalUser;
