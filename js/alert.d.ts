import * as $ from 'jquery';
import { Util } from './util';

declare class Alert {
  static VERSION: string;
  constructor(element: HTMLElement);
  close(element?: HTMLElement): void;
  dispose(): void;
  private _getRootElement;
  private _triggerCloseEvent;
  private _removeElement;
  private _destroyElement;
  static _jQueryInterface(config: 'close' | 'dispose'): JQuery;
  static _handleDismiss(alertInstance: Alert): (event: JQuery.Event) => void;
}

declare global {
  interface JQuery {
    alert(config: 'close' | 'dispose'): JQuery;
  }

  interface Window {
    Alert: typeof Alert;
    Util: typeof Util;
  }
}
declare namespace Bootstrap {
  class Alert {
    static VERSION: string;
    constructor(element: HTMLElement);
    close(element?: HTMLElement): void;
    dispose(): void;
    private _getRootElement;
    private _triggerCloseEvent;
    private _removeElement;
    private _destroyElement;
    static _jQueryInterface(config: 'close'): JQuery;
    static _handleDismiss(alertInstance: Alert): (event: JQuery.Event) => void;
  }
}

declare global {
  interface JQuery {
    alert(config: 'close'): JQuery;
  }

  interface Window {
    Alert: typeof Bootstrap.Alert;
    Util: {
      getSelectorFromElement: (element: HTMLElement) => string;
      TRANSITION_END: string;
      getTransitionDurationFromElement: (element: HTMLElement) => number;
      emulateTransitionEnd: (element: HTMLElement, duration: number) => void;
    };
  }
}

export = Bootstrap.Alert;
export = Alert;