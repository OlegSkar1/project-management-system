import { Button, Col, Menu, MenuProps, MenuTheme, Row, Space } from 'antd';
import { Layout } from 'antd';
import logo from '../assets/logo/logo_no_bg.png';
import { useNavigate } from 'react-router-dom';
import { LOGIN, SIGNUP } from '../router/constants';
import { useState } from 'react';

const items = [
  {
    label: 'sign In',
    key: 'login',
  },
  {
    label: 'sign Up',
    key: 'signup',
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('signup');
  const { Header } = Layout;
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <img src={logo} alt="logo" style={{ height: '100%' }} />
      </div>
      <Menu
        items={items}
        defaultSelectedKeys={[current]}
        theme="dark"
        mode="horizontal"
        style={{ fontSize: 20 }}
        onClick={onClick}
      />
    </Header>
  );
};

export default Header;
