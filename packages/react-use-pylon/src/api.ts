import * as logger from './logger';
import { PylonMethod } from './types';
import { isSSR } from './utils';

/**
 * Safely exposes `window.Pylon` and passes the arguments to the instance
 *
 * @param method method passed to the `window.Pylon` instance
 * @param args arguments passed to the `window.Pylon` instance
 *
 * @see {@link https://docs.usepylon.com/chat/api}
 */
const PylonAPI = (method: PylonMethod, ...args: Array<any>) => {
  logger.log('debug', `${method} on Pylon instance`);
  if (!isSSR && window.Pylon) {
    return window.Pylon.apply(null, [method, ...args]);
  } else {
    logger.log('error', `${method} Pylon instance is not initalized yet`);
  }
};

export default PylonAPI;