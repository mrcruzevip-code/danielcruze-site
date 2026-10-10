import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  window.visualViewport?.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('resize', callback);
    window.visualViewport?.removeEventListener('resize', callback);
  };
};
const width = () => window.innerWidth;
const height = () => window.innerHeight;
const server = () => 0;

/** Browser dimensions with stable SSR snapshots; does not depend on native/iframe contexts. */
export function useWebViewport() {
  return {
    width: useSyncExternalStore(subscribe, width, server),
    height: useSyncExternalStore(subscribe, height, server),
  };
}
