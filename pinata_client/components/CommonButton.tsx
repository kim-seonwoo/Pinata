import commonStyles from "@/constants/commonStyles";
import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";

type ButtonSize = "large" | "medium" | "small";

interface CommonButtonProps {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  size = "medium",
  buttonStyle,
  textStyle,
}) => {
  const sizeStyles = {
    large: {
      container: commonStyles.buttonLarge,
      text: commonStyles.buttonTextLarge,
    },
    medium: {
      container: commonStyles.buttonMedium,
      text: commonStyles.buttonTextMedium,
    },
    small: {
      container: commonStyles.buttonSmall,
      text: commonStyles.buttonTextSmall,
    },
  };

  return (
    <TouchableOpacity
      style={[sizeStyles[size].container, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[sizeStyles[size].text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
