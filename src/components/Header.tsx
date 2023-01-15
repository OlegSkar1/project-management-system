import { Menu, MenuProps } from 'antd';
import { Layout } from 'antd';
import logo from '../assets/logo/logo_no_bg.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const items = [
  {
    label: 'sign In',
    key: '/login',
  },
  {
    label: 'sign Up',
    key: '/signup',
  },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const { Header } = Layout;

  const onClickMenuItem: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const onClickLogo = () => {
    navigate('/');
    setCurrent('/');
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ cursor: 'pointer' }} onClick={onClickLogo}>
        <img src={logo} alt="logo" style={{ height: '100%' }} />
      </div>
      <Menu
        items={items}
        selectedKeys={[current]}
        theme="dark"
        mode="horizontal"
        style={{ fontSize: 20 }}
        onClick={onClickMenuItem}
      />
    </Header>
  );
};

export default Header;
