import React from 'react';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';

import '../styles/globals.scss';
import { PlayerProvider } from '../context/Player';
import Player from '../components/Player';

const MusicApp = ({ Component: component, pageProps }: AppProps) => {
  const Component = component as any;

  return (
    <PlayerProvider>
      <Component {...pageProps} />
      <Player />
    </PlayerProvider>
  );
};

export default wrapper.withRedux(MusicApp);
