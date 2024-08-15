import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import Icon from "../assets/icons";
import { theme } from "../constants/theme";

const BackButton = ({ size = 26, router }) => {
  const colorSchema = useColorScheme();

  const iconTheme = colorSchema === "dark" ? "#E0E0E0" : "#333333";
  const backgroundTheme = colorSchema === "dark" ? "#555555" : "#CCCCCC";

  return (
    <Pressable
      onPress={() => router.back()}
      style={[styles.button, { backgroundColor: backgroundTheme }]}
    >
      <Icon name="arrowLeft" strokeWidth={2.5} size={size} color={iconTheme} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: theme.radius.sm,
  },
});
