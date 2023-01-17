import { Layout } from 'antd';
import { Login } from '../../components/Login';
import loginPage from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <Layout.Content className={loginPage.container}>
      <Login />
    </Layout.Content>
  );
};
