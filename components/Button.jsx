import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import { theme, useTheme } from "../constants/theme";
import { hp } from "../helpers/common";
import Loading from "./Loading";

const Button = ({
  buttonStyle,
  textStyle,
  title = "",
  onPress = () => {},
  loading = false,
  hasShadow = true,
}) => {
  const theme = useTheme();
  const colorSchema = useColorScheme();

  const buttonTheme = colorSchema === "dark" ? "#3498DB" : "#2980B9";

  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle]}>
        <Loading />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        buttonStyle,
        hasShadow && shadowStyle,
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radius.xl,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          textStyle,
          {
            color: theme.colors.textPrimary,
            fontWeight: theme.fonts.bold,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
  },
  text: {
    fontSize: hp(2.8),
  },
});
