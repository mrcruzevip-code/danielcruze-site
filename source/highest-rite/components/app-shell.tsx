import { useState } from "react";
import { View } from "react-native";
import { DrawerMenu } from "./drawer-menu";
import { HeaderBar } from "./header-bar";
import { useColors } from "@/hooks/use-colors";

interface AppShellProps {
  children: React.ReactNode;
  showBack?: boolean;
  title?: string;
  headerTransparent?: boolean;
  hideHeader?: boolean;
}

export function AppShell({
  children,
  showBack = false,
  title,
  headerTransparent = false,
  hideHeader = false,
}: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const colors = useColors();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {!hideHeader && (
        <HeaderBar
          onMenuPress={() => setDrawerOpen(true)}
          showBack={showBack}
          title={title}
          transparent={headerTransparent}
        />
      )}
      <View style={{ flex: 1 }}>{children}</View>
      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </View>
  );
}
