import Head from 'next/head';
import { usePylon } from 'react-use-pylon';
import { useState } from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {
  const { show, update } = usePylon();
  const [loggedIn, setLoggedInState] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pylon Demo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!loggedIn && (
          <button
            onClick={() => {
              update({
                email: 'malek.bola@gmail.com',
                name: 'Bola Malek',
              });
              setLoggedInState(true);
            }}
          >
            Login
          </button>
        )}
        {loggedIn && (
          <button
            onClick={() => {
              show();
            }}
          >
            Get Help.
          </button>
        )}
      </main>
    </div>
  );
}
