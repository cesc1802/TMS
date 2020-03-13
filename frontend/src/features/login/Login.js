import React from "react";
import { Form, Icon, Input, Button, Alert } from "antd";
import { useLogin } from "./redux/hooks";

const Login = props => {
    const { getFieldDecorator, validateFields } = props.form;
    const { isPending, doLogin, error } = useLogin();

    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (err) return;
            const { username, password } = values;
            doLogin({ username, password });
        });
    };

    const getRules = (options = {}) => {
        return [
            {
                required: options.required,
                message: options.message
            }
        ];
    };
    return (
        <div className="login-container">
            <div className="login-form">
                <Form onSubmit={handleSubmit}>
                    <div className="login-form-item">
                        <Form.Item>
                            {getFieldDecorator("username", {
                                rules: getRules({
                                    required: true,
                                    message: "Please input your username!"
                                })
                            })(
                                <Input
                                    prefix={<Icon type="user" />}
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                    </div>

                    <div className="login-form-item">
                        <Form.Item>
                            {getFieldDecorator("password", {
                                rules: getRules({
                                    required: true,
                                    message: "Please input your Password!"
                                })
                            })(
                                <Input
                                    prefix={<Icon type="lock" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                    </div>
                    {error ? (
                        <Alert message={error.data.message} type="error" />
                    ) : null}
                    <div className="login-form-item">
                        <Form.Item>
                            <Button
                                type="primary"
                                loading={isPending}
                                htmlType="submit"
                                shape="round"
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
