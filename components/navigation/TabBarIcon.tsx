import AntDesign from '@expo/vector-icons/AntDesign';
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { View } from "react-native";

interface CustomIconProps
  extends IconProps<ComponentProps<typeof AntDesign>["name"]> {
  focused?: boolean; // Add this line
  borderColor?: string; // Keep this if you want to use border color
}

export function TabBarIcon({
  style,
  focused,
  borderColor,
  ...rest
}: CustomIconProps) {
  return (
    <>
      <AntDesign size={20} style={[{ marginBottom: -3 }, style]} {...rest} />
      {focused && (
        <View
          style={{
            height: 3,
            backgroundColor: borderColor,
            position: "absolute",
            top: -2,
            left: "52%",
            right: "23%",
            marginLeft: -30,
          }}
        />
      )}
    </>
  );
}