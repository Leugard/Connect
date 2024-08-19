import { Pressable, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import Icon from "../assets/icons";
import { useTheme } from "../constants/theme";

const BackButton = ({ size = 26, router }) => {
  const theme = useTheme();
  const colorSchema = useColorScheme();

  const iconTheme = colorSchema === "dark" ? "#E0E0E0" : "#333333";
  const backgroundTheme = colorSchema === "dark" ? "#555555" : "#CCCCCC";

  return (
    <Pressable
      onPress={() => router.back()}
      style={[
        styles.button,
        { backgroundColor: backgroundTheme, borderRadius: theme.radius.sm },
      ]}
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
  },
});
