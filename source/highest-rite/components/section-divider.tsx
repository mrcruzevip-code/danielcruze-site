import { View } from "react-native";
import { useColors } from "@/hooks/use-colors";

export function SectionDivider() {
  const colors = useColors();
  return (
    <View
      style={{
        width: 40,
        height: 0.5,
        backgroundColor: colors.primary,
        alignSelf: "center",
        marginVertical: 48,
        opacity: 0.6,
      }}
    />
  );
}
