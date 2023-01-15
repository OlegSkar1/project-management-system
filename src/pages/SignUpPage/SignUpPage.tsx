import { Layout } from 'antd';
import React from 'react';
import { SignUp } from '../../components/SignUp';
import styles from './SignUpPage.module.scss';

export const SignUpPage: React.FC = () => {
  return (
    <Layout.Content className={styles.container}>
      <SignUp />
    </Layout.Content>
  );
};
