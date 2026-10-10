import '@/global.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useWebViewport } from '@/hooks/use-web-viewport';
import { SafeAreaProvider, SafeAreaFrameContext } from 'react-native-safe-area-context';

/** Static public web has no member auth, server state or embedding-window dependency. */
export default function WebRootLayout() {
  const { width, height } = useWebViewport();
  const frame = { x: 0, y: 0, width: width || 1024, height: height || 768 };
  return <SafeAreaProvider initialMetrics={{ frame, insets: {top:0,right:0,bottom:0,left:0} }}>
    <SafeAreaFrameContext.Provider value={frame}>
      <View style={{ flex: 1, backgroundColor: '#0A0A0A' }}>
        <Stack screenOptions={{ headerShown: false, animation: 'none', contentStyle: { backgroundColor: '#0A0A0A' } }} />
      </View>
    </SafeAreaFrameContext.Provider>
  </SafeAreaProvider>;
}
