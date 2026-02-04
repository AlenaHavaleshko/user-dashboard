import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../features/auth/useAuth";
import styles from "./Login.module.scss";

const Login = () => {
  const { login, isLoading, error } = useAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    await login(values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h1>Welcome Back</h1>
          <p>Please login to your account</p>
        </div>

        {error && (
          <Alert
            title="Login Failed"
            description={error}
            type="error"
            showIcon
            closable
            className={styles.alert}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          className={styles.form}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              disabled={isLoading}
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.hint}>
          <Alert
            title="Test Credentials"
            description="Username: emilys | Password: emilyspass"
            type="info"
            showIcon
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
