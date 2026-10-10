import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface CTAButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function CTAButton({
  label,
  onPress,
  variant = "outline",
  size = "md",
}: CTAButtonProps) {
  const colors = useColors();

  const paddingV = size === "sm" ? 10 : size === "lg" ? 18 : 14;
  const paddingH = size === "sm" ? 20 : size === "lg" ? 40 : 28;
  const fontSize = size === "sm" ? 11 : size === "lg" ? 14 : 12;

  const bgColor =
    variant === "primary"
      ? colors.primary
      : "transparent";
  const borderColor =
    variant === "ghost"
      ? "transparent"
      : variant === "primary"
      ? colors.primary
      : colors.foreground;
  const textColor =
    variant === "primary" ? colors.foreground : colors.foreground;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        paddingVertical: paddingV,
        paddingHorizontal: paddingH,
        borderWidth: 0.5,
        borderColor,
        backgroundColor: bgColor,
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize,
          fontWeight: "300",
          letterSpacing: 3,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
