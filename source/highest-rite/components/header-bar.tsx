import { View, Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";

interface HeaderBarProps {
  onMenuPress: () => void;
  showBack?: boolean;
  title?: string;
  transparent?: boolean;
}

export function HeaderBar({
  onMenuPress,
  showBack = false,
  title,
  transparent = false,
}: HeaderBarProps) {
  const router = useRouter();
  const colors = useColors();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "web" ? 16 : 54,
        paddingBottom: 12,
        backgroundColor: transparent ? "transparent" : colors.background,
        position: transparent ? "absolute" : "relative",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              paddingRight: 16,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                color: colors.foreground,
                fontSize: 14,
                fontWeight: "300",
                letterSpacing: 2,
              }}
            >
              ← BACK
            </Text>
          </TouchableOpacity>
        )}
        {title && (
          <Text
            numberOfLines={1}
            style={{
              color: colors.foreground,
              fontSize: 12,
              fontWeight: "300",
              letterSpacing: 2,
              textTransform: "uppercase",
              flex: 1,
            }}
          >
            {showBack ? "" : title}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={onMenuPress}
        style={{
          padding: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ gap: 5 }}>
          <View
            style={{
              width: 22,
              height: 1,
              backgroundColor: colors.foreground,
            }}
          />
          <View
            style={{
              width: 16,
              height: 1,
              backgroundColor: colors.foreground,
              alignSelf: "flex-end",
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
