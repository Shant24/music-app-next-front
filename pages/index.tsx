import React, { memo } from 'react';
import { Button } from '@material-ui/core';

import styles from '../styles/Index.module.scss';
import Header from '../components/Header';
import MainLayout from '../layouts/MainLayout';

const Index: React.FC = () => {
  return (
    <MainLayout>
      <div className={styles.center}>
        <h1>Добро пожаловать!</h1>
        <h3>Здесь собраны лучшие треки!</h3>
      </div>
    </MainLayout>
  );
};

export default memo(Index);
