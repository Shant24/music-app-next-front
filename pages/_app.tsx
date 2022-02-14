import React from 'react';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';
import { useTypedSelector } from '../hooks';

import '../styles/globals.scss';
import Player from '../components/Player';

const MusicApp = ({ Component, pageProps }: AppProps) => {
  const active = useTypedSelector((state) => state.player.active);

  return (
    <>
      <Component {...pageProps} />
      {active && <Player />}
    </>
  );
};

export default wrapper.withRedux(MusicApp);
