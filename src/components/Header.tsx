import { Button, Space } from 'antd';
import { Layout } from 'antd';
import logo from '../assets/logo/logo_no_bg.png';
import { useNavigate } from 'react-router-dom';
import { LOGIN, SIGNUP } from '../router/constants';

const Header: React.FC = () => {
  const { Header } = Layout;
  const navigate = useNavigate();

  return (
    <Layout style={{ width: '100vw', background: '#001529' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1320px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* <div
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            cursor: 'pointer',
            height: '100%',
            width: '200px',
          }}
          onClick={() => navigate('/')}
        ></div> */}
        <img
          src={logo}
          alt="logo"
          style={{ height: '150%', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <Space>
          <Button type="primary" onClick={() => navigate(LOGIN)}>
            Sign In
          </Button>
          <Button type="primary" onClick={() => navigate(SIGNUP)}>
            Sign Up
          </Button>
        </Space>
      </Header>
    </Layout>
  );
};

export default Header;
