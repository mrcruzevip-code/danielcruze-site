import { useSiteDimensions } from "@/hooks/use-site-dimensions";
import { View, Text, ScrollView, Platform, Linking } from "react-native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { DRAWER_ITEMS, BRAND, SOCIALS } from "@/lib/content";
import { useColors } from "@/hooks/use-colors";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const SOCIAL_LINKS = [
  { label: "Instagram", url: SOCIALS.instagram.url },
  { label: "Facebook", url: SOCIALS.facebook.url },
  { label: "X / Twitter", url: SOCIALS.x.url },
  { label: "Telegram", url: SOCIALS.telegramChannel.url },
  { label: "@danielcruzelife_bot", url: "https://t.me/danielcruzelife_bot" },
];

export function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const router = useRouter();
  const colors = useColors();
  const { width: SCREEN_WIDTH } = useSiteDimensions();

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(visible ? 1 : 0, {
      duration: 300,
      easing: Easing.ease,
    }),
    pointerEvents: visible ? ("auto" as const) : ("none" as const),
  }));

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(visible ? 0 : SCREEN_WIDTH, {
          duration: 350,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      },
    ],
  }));

  const handleNavigate = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route as any);
    }, 200);
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
        },
        overlayStyle,
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
          accessibilityLabel="Close menu"
          onPress={onClose}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: Math.min(SCREEN_WIDTH * 0.78, 320),
            backgroundColor: colors.background,
            borderLeftWidth: 0.5,
            borderLeftColor: colors.border,
            paddingTop: Platform.OS === "web" ? 60 : 80,
            paddingHorizontal: 32,
          },
          drawerStyle,
        ]}
      >
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Close menu"
          onPress={onClose}
          style={{
            position: "absolute",
            top: Platform.OS === "web" ? 20 : 50,
            right: 24,
            padding: 8,
          }}
        >
          <Text
            style={{
              color: colors.muted,
              fontSize: 18,
              fontWeight: "300",
              letterSpacing: 2,
            }}
          >
            CLOSE
          </Text>
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {DRAWER_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={() => handleNavigate(item.route)}
              style={{
                paddingVertical: 14,
                borderBottomWidth: index < DRAWER_ITEMS.length - 1 ? 0.5 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <Text
                style={{
                  color: colors.foreground,
                  fontSize: 16,
                  fontWeight: "300",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Social Links */}
          <View style={{ marginTop: 32, marginBottom: 16 }}>
            <Text
              style={{
                color: "#8B2635",
                fontSize: 11,
                letterSpacing: 3,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              CONNECT
            </Text>
            {SOCIAL_LINKS.map((social) => (
              <TouchableOpacity
                key={social.label}
                onPress={() => Linking.openURL(social.url)}
                style={{ paddingVertical: 8 }}
              >
                <Text
                  style={{
                    color: colors.muted,
                    fontSize: 13,
                    letterSpacing: 1,
                  }}
                >
                  {social.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${BRAND.email}`)}
              style={{ paddingVertical: 8 }}
            >
              <Text
                style={{
                  color: colors.muted,
                  fontSize: 13,
                  letterSpacing: 1,
                }}
              >
                {BRAND.email}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={{ marginTop: 24 }}>
            <Text
              style={{
                color: "#8B2635",
                fontSize: 11,
                letterSpacing: 3,
                fontWeight: "500",
                fontStyle: "italic",
                marginBottom: 8,
              }}
            >
              {BRAND.seal}
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontSize: 11,
                letterSpacing: 1,
                lineHeight: 18,
              }}
            >
              {BRAND.locations.join(" · ")}
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontSize: 11,
                letterSpacing: 1,
                marginTop: 8,
              }}
            >
              {BRAND.copyright}
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
}
