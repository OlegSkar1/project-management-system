import { Layout } from 'antd';
import Login from '../../components/Login/Login';
import loginPage from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <Layout.Content className={loginPage.container}>
      <Login />
    </Layout.Content>
  );
};

export default LoginPage;
