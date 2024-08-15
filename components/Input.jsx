import { StyleSheet, TextInput, useColorScheme, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const Input = (props) => {
  const colorScheme = useColorScheme();

  const borderTheme = colorScheme === "dark" ? "#555555" : "#CCCCCC";
  const textTheme = colorScheme === "dark" ? "#E0E0E0" : "#333333";
  const placeholderTheme = colorScheme === "dark" ? "#777777" : "#AAAAAA";

  return (
    <View
      style={[
        styles.container,
        props.containerStyles && props.containerStyles,
        { borderColor: borderTheme },
      ]}
    >
      {props.icon && props.icon}
      <TextInput
        style={{ flex: 1, color: textTheme }}
        placeholderTextColor={placeholderTheme}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    paddingHorizontal: 18,
    gap: 12,
  },
});
