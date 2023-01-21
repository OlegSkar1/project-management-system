import { Menu, MenuProps, Layout, Space, Row } from 'antd';
import logo from '../../assets/logo/logo_no_bg.png';
import styles from './Header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LOGIN } from '../../router/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { logout } from '../../store/userSlice';

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

const authItems = [
  {
    label: 'Dashboard',
    key: '/dashboard',
  },
];

const signout = [
  {
    label: 'Sign Out',
    key: '/login',
  },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const { isAuth, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { Header } = Layout;

  const onClickMenuItem: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const onClickLogo = () => {
    navigate('/');
  };

  const signoutHandler = () => {
    dispatch(logout());
    navigate(LOGIN);
  };

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <div className="wrapper">
      <Header className={styles.header}>
        {isAuth ? (
          <Row style={{ cursor: 'pointer' }}>
            <div style={{ height: '64px' }} onClick={onClickLogo}>
              <img src={logo} alt="logo" style={{ height: '100%' }} />
            </div>
            <Menu
              disabledOverflow
              items={authItems}
              theme="dark"
              mode="horizontal"
              style={{ fontSize: 20 }}
              onClick={onClickMenuItem}
            />
          </Row>
        ) : (
          <div style={{ cursor: 'pointer' }} onClick={onClickLogo}>
            <img src={logo} alt="logo" style={{ height: '100%' }} />
          </div>
        )}

        {isAuth ? (
          <Space>
            <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 20 }}>
              {user.name}
            </div>
            <Menu
              disabledOverflow={true}
              items={signout}
              selectable={false}
              theme="dark"
              mode="horizontal"
              style={{ fontSize: 20 }}
              onClick={signoutHandler}
            />
          </Space>
        ) : (
          <Menu
            disabledOverflow={true}
            items={items}
            selectedKeys={[current]}
            theme="dark"
            mode="horizontal"
            style={{ fontSize: 20 }}
            onClick={onClickMenuItem}
          />
        )}
      </Header>
    </div>
  );
};
