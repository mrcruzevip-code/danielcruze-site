import { useSyncExternalStore } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};
const width = () => typeof window === 'undefined' ? 1024 : window.innerWidth;
const height = () => typeof window === 'undefined' ? 768 : window.innerHeight;
/** Preserve native metrics; web uses reliable standalone viewport snapshots. */
export function useSiteDimensions() {
  const native = useWindowDimensions();
  const w = useSyncExternalStore(subscribe, width, () => 1024);
  const h = useSyncExternalStore(subscribe, height, () => 768);
  return Platform.OS === 'web' ? { ...native, width: w, height: h } : native;
}
