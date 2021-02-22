import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
import '../styles/globals.scss';

const MusicApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MusicApp);
