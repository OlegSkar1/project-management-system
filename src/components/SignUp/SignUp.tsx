import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../router/constants';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  const onFinish = (values: FormData) => {
    console.log(values);
  };

  return (
    <Form
      className={styles.wrapper}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
    >
      <Typography.Title level={3} className={styles.login_title}>
        Sign up for Limy
      </Typography.Title>
      <Form.Item
        hasFeedback
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter your name',
          },
          {
            pattern: /^([a-zA-Z][ ]?)*$/,
            message: 'Enter only letters separated by spaces',
          },
        ]}
      >
        <Input placeholder="Type your name" />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="enter email" />
      </Form.Item>
      <Form.Item
        name="password"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please enter your password',
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
            message:
              'Password must have 1 uppercase letter, 1 lowercase letter and 1 number',
          },
          {
            type: 'string',
            min: 6,
            message: 'Must be at least 6 characters',
          },
        ]}
      >
        <Input.Password placeholder="enter password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please Confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="confirm password" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          block
          type="primary"
          htmlType="submit"
          style={{ marginBottom: 15 }}
        >
          Register
        </Button>
        <div className={styles['text-align']}>
          Already registered? <Link to={`../${LOGIN}`}>Login!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
