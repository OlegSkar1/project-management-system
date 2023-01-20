import { Button, Form, Input, message, Typography } from 'antd';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SIGNUP } from '../../router/constants';
import { signIn } from '../../server/methods';
import styles from './Login.module.scss';

interface IFormData {
  email: string;
  password: string;
}

export const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const navigate = useNavigate();

  const fromPage = location.state?.from?.pathname || '/';

  const onFinish = (values: IFormData) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await signIn(values);
        localStorage.setItem('user', res.email);
        setLoading(false);
        navigate(fromPage, { replace: true });
      } catch (error) {
        setLoading(false);
        const e = error as AxiosResponse;
        messageApi.error(e.statusText);
      }
    }, 800);

    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        className={styles.login}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Typography.Title level={3} className={styles.login_title}>
          Log in Limi
        </Typography.Title>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email address',
            },
          ]}
        >
          <Input placeholder="enter email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input.Password placeholder="enter password" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ marginBottom: 15 }}
            loading={loading}
          >
            Sign In
          </Button>
          <div className={styles['text-align']}>
            Or <Link to={`../${SIGNUP}`}>register now!</Link>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
