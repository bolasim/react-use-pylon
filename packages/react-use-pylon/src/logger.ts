import { LogLevel } from './types';

/**
 * Logs messages in the console with a corresponding urgency
 *
 * @param level the urgency of the message
 * @param message the message to log in the console
 */
export const log = (level: LogLevel, message: string) => {
  const packageName = '[react-use-pylon]';
  const logMsg = `${packageName} ${message}`;
  switch (level) {
    case 'info':
      console.log(logMsg);
      break
    case 'debug':
      console.debug(logMsg);
      break;
    case 'warn':
      console.warn(logMsg);
      break;
    case 'error':
      console.error(logMsg);
      break;
    default:
      console.log(logMsg);
  }
};