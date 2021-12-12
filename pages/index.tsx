import React from 'react';

import MainLayout from '../layouts/MainLayout';
import styles from '../styles/Index.module.scss';

const Home = () => (
  <MainLayout>
    <div className={styles.center}>
      <h1>Welcome!</h1>
      <h3>Here are the best tracks!</h3>
    </div>
  </MainLayout>
);

export default Home;
