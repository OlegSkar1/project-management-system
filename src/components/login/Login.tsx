import { Button, Form, Input } from 'antd';
import './login.module.scss';

const Login = () => {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
      <Form.Item label={'Login'} name="login">
        <Input required placeholder="enter login" />
      </Form.Item>
      <Form.Item label={'Password'} name="password">
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
