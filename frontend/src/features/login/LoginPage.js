import Login from "./Login";
import { Form } from "antd";

const LoginPage = Form.create({ name: "login" })(Login);
export default LoginPage;
