import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SIGNUP } from '../../router/constants';
import styles from './Login.module.scss';

export const Login = () => {
  return (
    <Form className={styles.login} wrapperCol={{ span: 24 }}>
      <Typography.Title level={3} className={styles.login_title}>
        Log in Limi
      </Typography.Title>
      <Form.Item name="login">
        <Input required placeholder="enter login" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password required placeholder="enter password" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button block type="primary" htmlType="submit" style={{ marginBottom: 15 }}>
          Sign In
        </Button>
        <div className={styles['text-align']}>
          Or <Link to={`../${SIGNUP}`}>register now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
