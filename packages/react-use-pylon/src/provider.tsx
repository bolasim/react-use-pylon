import * as React from 'react';

import PylonAPI from './api';
import PylonContext from './context';
import initialize from './initialize';
import * as logger from './logger';
import {
  PylonChatSettings,
  PylonProps,
  PylonContextValues,
  PylonProviderProps,
  RawPylonChatSettings,
} from './types';
import { mapPylonPropsToRawPylonProps } from './mappers';
import { isSSR } from './utils';

export const PylonProvider: React.FC<
  React.PropsWithChildren<PylonProviderProps>
> = ({
  chatSettings,
  autoBoot = false,
  children,
  onHide,
  onShow,
  onUnreadCountChange,
  shouldInitialize = !isSSR,
  initializeDelay,
  ...rest
}) => {
  const isBooted = React.useRef(false);
  const isInitialized = React.useRef(false);

  // Allow data-x attributes
  const invalidPropKeys = Object.keys(rest).filter(
    (key) => !key.startsWith('data-'),
  );

  if (invalidPropKeys.length > 0) {
    logger.log(
      'warn',
      [
        'some invalid props were passed to PylonProvider. ',
        `Please check following props: ${invalidPropKeys.join(', ')}.`,
      ].join(''),
    );
  }

  const boot = React.useCallback(
    (props: PylonChatSettings) => {
      if (!window.Pylon && !shouldInitialize) {
        logger.log(
          'warn',
          'Pylon instance is not initialized because `shouldInitialize` is set to `false` in `PylonProvider`',
        );
        return;
      }

      const rawChatSettings: RawPylonChatSettings =
        mapPylonPropsToRawPylonProps(props);

      window.pylon.chat_settings = rawChatSettings;

      isBooted.current = true;
    },
    [chatSettings, shouldInitialize],
  );

  const [isOpen, setIsOpen] = React.useState(false);

  const onHideWrapper = React.useCallback(() => {
    setIsOpen(false);
    if (onHide) onHide();
  }, [onHide, setIsOpen]);

  const onShowWrapper = React.useCallback(() => {
    setIsOpen(true);
    if (onShow) onShow();
  }, [onShow, setIsOpen]);
  if (!isSSR && shouldInitialize && !isInitialized.current) {
    initialize(chatSettings.appId, initializeDelay);
    if (onUnreadCountChange) {
      PylonAPI('onChangeUnreadMessagesCount', onUnreadCountChange);
    }

    if (autoBoot) {
      boot(chatSettings);
    }

    isInitialized.current = true;
  }

  const ensurePylon = React.useCallback(
    (functionName: string, callback: (() => void) | (() => string)) => {
      if (!window.Pylon && !shouldInitialize) {
        logger.log(
          'warn',
          'Pylon instance is not initialized because `shouldInitialize` is set to `false` in `PylonProvider`',
        );
        return;
      }
      if (!isBooted.current) {
        logger.log(
          'warn',
          [
            `"${functionName}" was called but Pylon has not booted yet. `,
            `Please call 'boot' before calling '${functionName}' or `,
            `set 'autoBoot' to true in the PylonProvider.`,
          ].join(''),
        );
        return;
      }
      return callback();
    },
    [shouldInitialize],
  );

  const update = React.useCallback(
    (props: Partial<PylonProps>) => {
      ensurePylon('update', () => {
        if (!props) {
          return;
        }

        const chatSettingsUpdateRaw = mapPylonPropsToRawPylonProps(props);

        window.pylon.chat_settings = {
          ...window.pylon.chat_settings,
          ...chatSettingsUpdateRaw,
        };
      });
    },
    [ensurePylon],
  );

  const hide = React.useCallback(() => {
    ensurePylon('hide', () => PylonAPI('hide'));
    onHideWrapper();
  }, [ensurePylon]);

  const show = React.useCallback(() => {
    ensurePylon('show', () => PylonAPI('show'));
    onShowWrapper();
  }, [ensurePylon]);

  const providerValue = React.useMemo<PylonContextValues>(() => {
    return {
      boot,
      update,
      hide,
      show,
      isOpen,
    };
  }, [boot, update, hide, show, isOpen]);

  return (
    <PylonContext.Provider value={providerValue}>
      {children}
    </PylonContext.Provider>
  );
};

export const usePylonContext = () => {
  const context = React.useContext(PylonContext);

  if (context === undefined) {
    throw new Error('"usePylon" must be used within `PylonProvider`.');
  }

  return context as PylonContextValues;
};
