import { Button, Form, Input, Typography } from 'antd';
import login from './Login.module.scss';

const Login = () => {
  return (
    <Form className={login.login} wrapperCol={{ span: 24 }}>
      <Typography.Title level={3} className={login.login_title}>
        Log in Limi
      </Typography.Title>
      <Form.Item name="login">
        <Input required placeholder="enter login" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password required placeholder="enter password" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button block type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
