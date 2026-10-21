import { useRef, useEffect } from "react";
import WebViewer, {
  type WebViewerInstance,
  type WebViewerOptions,
} from "@pdftron/webviewer";

// Mounts a WebViewer instance on the returned ref and disposes it on unmount.
// `onReady` runs once the instance is available; it may return a cleanup function.
export const useWebViewer = (
  options: Omit<WebViewerOptions, "path" | "licenseKey">,
  onReady?: (instance: WebViewerInstance) => (() => void) | void,
) => {
  const viewer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewerElement = viewer.current;
    if (!viewerElement) return;

    let isUnmounted = false;
    let webViewerInstance: WebViewerInstance | null = null;
    let cleanup: (() => void) | void;

    WebViewer(
      {
        path: "/lib/webviewer",
        // Set VITE_DEMO_KEY in .env (see .env.example). Get a free trial key at https://dev.apryse.com
        licenseKey: import.meta.env.VITE_DEMO_KEY,
        ...options,
      },
      viewerElement,
    ).then((instance: WebViewerInstance) => {
      if (isUnmounted) {
        instance.UI.dispose();
        return;
      }

      webViewerInstance = instance;
      cleanup = onReady?.(instance);
    });

    return () => {
      isUnmounted = true;

      if (webViewerInstance) {
        cleanup?.();
        webViewerInstance.UI.dispose();
      }
    };
    // Options are expected to be static for the lifetime of the viewer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return viewer;
};
