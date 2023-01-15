import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../router/constants';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  return (
    <Form className={styles.wrapper} wrapperCol={{ span: 24 }}>
      <Typography.Title level={3} className={styles.login_title}>
        Sign up for Limy
      </Typography.Title>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter your name',
          },
          {
            pattern: new RegExp(/^([a-zA-Z][ ]?)*$/),
            message: 'Enter only letters separated by spaces',
          },
        ]}
      >
        <Input placeholder="Type your name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="email" placeholder="enter email" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password placeholder="enter password" />
      </Form.Item>
      <Form.Item name="confirmPassword">
        <Input.Password placeholder="confirm password" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button block type="primary" htmlType="submit" style={{ marginBottom: 15 }}>
          Register
        </Button>
        <div className={styles['text-align']}>
          Already registered? <Link to={`../${LOGIN}`}>Login!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
