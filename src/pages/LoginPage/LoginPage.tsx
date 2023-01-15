import { Layout } from 'antd';
import Login from '../../components/login/Login';
import './LoginPage.scss';

const LoginPage = () => {
  return (
    <Layout.Content className="LoginPage">
      <Login />
    </Layout.Content>
  );
};

export default LoginPage;
