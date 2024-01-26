import Head from 'next/head';
import { usePylon } from 'react-use-pylon';

import styles from '../styles/Home.module.css';

export default function Home() {
  const { show } = usePylon();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button
          onClick={() => {
            console.log('clicking');
            show();
          }}
        >
          Boot
        </button>
      </main>
    </div>
  );
}
