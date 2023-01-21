import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import styles from './Layout.module.scss';

export const LayoutPage: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <div className={styles.main}>
        <Header />
        <Layout>
          <Outlet />
        </Layout>
      </div>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};
