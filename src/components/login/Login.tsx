import { Button, Form, Input, Typography } from 'antd';
import './Login.scss';

const Login = () => {
  return (
    <Form className="login" wrapperCol={{ span: 24 }}>
      <Typography.Title level={3} className="login_title">
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
