export {};
declare global {
  interface Window {
    Pylon: any;
    pylon: any;
    attachEvent: any;
  }
  interface HTMLScriptElement {
    parentNode: any;
  }
}