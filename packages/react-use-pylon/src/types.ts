export type RawPylonChatSettings = {
  app_id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  email_hash?: string;
};

export type PylonChatSettings = {
  appId: string;

  /** This email of the logged in user */
  email: string;

  /** The full name of the logged in user */
  name: string;

  /** (Optional) If you have the user's profile image available through something like Auth0 */
  avatarUrl?: string;

  /** (Optional) If you are using Pylon's identity verification */
  emailHash?: string;
};

export type RawPylonProps = RawPylonChatSettings;
export type PylonProps = PylonChatSettings;

// TODO: decide whether or not to keep this
export type PylonMethod = 'hide' | 'show' | 'onChangeUnreadMessagesCount';

export type LogLevel = 'info' | 'error' | 'warn';

export type PylonContextValues = {
  /**
   * Only including normal lifecycle events plus what's supprt on the official API
   *
   * @see {@link https://docs.usepylon.com/chat/api#window-pylon-onchangeunreadmessagescount}
   */

  boot: (props: PylonChatSettings) => void;

  update: (props: Partial<PylonChatSettings>) => void;

  hide: () => void;

  show: () => void;
  
  /**
   * The visibility status of the messenger.
   */
  isOpen: boolean;
};

export type PylonProviderProps = {
  /** The app ID of your Pylon app which will indicate where to store any data  */
  chatSettings: PylonChatSettings;
  /**
   * Indicates if Pylon should be automatically booted
   *
   * @remarks if `true`, 'boot' does not need to be called manually
   * */
  autoBoot?: boolean;

  /**
   * When we hide the messenger, you can hook into the event. This requires a function argument.
   */
  onHide?: () => void;
  /**
   * When we show the messenger, you can hook into the event. This requires a function argument.
   */
  onShow?: () => void;

  /**
   * This method allows you to register a function that will be called immediately
   * when invoked, and again whenever the current number of unread messages changes.
   */
  onUnreadCountChange?: (unreadCount: number) => void;

  /**
   * Indicates if Pylon should be initialized. This will ping to the Pylon servers.
   *
   * @remarks can be used for multistaged environments
   */
  shouldInitialize?: boolean;

  /**
   * Indicates if the Pylon initialization should be delayed, delay is in ms
   *
   * @remarks If not set delay is set to 0ms
   * */
  initializeDelay?: number;

  /**
   * Pass properties to `boot` method when `autoBoot` is `true`
   */
  autoBootProps?: PylonProps;
};
