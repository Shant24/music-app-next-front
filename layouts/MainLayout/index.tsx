import React, { memo, useEffect, useRef } from 'react';
import Head from 'next/head';

import Header from '../../components/Header';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactChild | React.ReactChild[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const windowResize = () => {
      document.body.setAttribute('style', `--vh: ${window.innerHeight}px`);
    };

    windowResize();
    window.addEventListener('resize', windowResize);

    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

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
    </>
  );
};

export default memo(MainLayout);
