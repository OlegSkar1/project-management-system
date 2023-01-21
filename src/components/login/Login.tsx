import { Button, Form, Input, message, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { setAsyncUser, setIsLoading } from '../../store/userSlice';
import { DASHBOARD, SIGNUP } from '../../router/constants';
import styles from './Login.module.scss';
import { IUser } from '../../server/models';

export const Login = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuth } = useAppSelector((state) => state.user);

  const onFinish = async (values: IUser) => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setAsyncUser(values));
    }, 1000);

    form.resetFields();
  };

  useEffect(() => {
    error && messageApi.error(error);
    isAuth && navigate(`../${DASHBOARD}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuth]);

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
            loading={isLoading}
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
