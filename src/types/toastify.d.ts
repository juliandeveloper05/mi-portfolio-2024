declare module "toastify-js" {
  interface ToastifyOptions {
    text?: string;
    node?: HTMLElement;
    duration?: number;
    selector?: string | HTMLElement;
    destination?: string;
    newWindow?: boolean;
    close?: boolean;
    gravity?: "top" | "bottom";
    position?: "left" | "center" | "right";
    backgroundColor?: string;
    avatar?: string;
    className?: string;
    stopOnFocus?: boolean;
    callback?: () => void;
    onClick?: () => void;
    offset?: {
      x?: number | string;
      y?: number | string;
    };
    escapeMarkup?: boolean;
    style?: object;
    ariaLive?: string;
    oldestFirst?: boolean;
  }

  interface ToastifyInstance {
    showToast: () => void;
    hideToast: () => void;
  }

  interface Toastify {
    (options: ToastifyOptions): ToastifyInstance;
  }

  const toastify: Toastify;
  export default toastify;
}
