import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

import Header from '../../components/Header';
import Player from '../../components/Player';
import { useTypedSelector } from '../../hooks';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  const { active } = useTypedSelector((state) => state.player);

  const mainRef = useRef(null);

  const windowResize = () => setWindowHeight(window.innerHeight);

  useEffect(() => {
    windowResize();
    window.addEventListener('resize', windowResize);
    return window.removeEventListener('resize', windowResize);
  }, []);

  useEffect(() => {
    mainRef &&
      (mainRef.current.parentNode.style.minHeight = `${windowHeight}px`);
  }, [windowHeight]);

  return (
    <>
      <Head>
        <title>{title || 'Music App'}</title>
        <meta
          name="description"
          content={`Music App. Here everyone can leave their track and become famous.${
            description ? ` ${description}` : ''
          }`}
        />
        <meta name="robots" content="index follow" />
        <meta
          name="keywords"
          content={`music, app, song, track, tracks, musics, artist, author, text, comment${
            keywords ? `, ${keywords}` : ''
          }`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main ref={mainRef}>{children}</main>

      {active && <Player />}
    </>
  );
};

export default MainLayout;
