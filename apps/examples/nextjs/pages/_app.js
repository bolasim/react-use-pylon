import '../styles/globals.css';

import { PylonProvider } from 'react-use-pylon';

const PYLON_APP_ID = '';

function MyApp({ Component, pageProps }) {
  return (
    <PylonProvider
      autoBoot={true}
      shouldInitialize={true}
      chatSettings={{
        appId: PYLON_APP_ID,
      }}
    >
      <Component {...pageProps} />
    </PylonProvider>
  );
}

export default MyApp;
