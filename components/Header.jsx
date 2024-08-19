import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import BackButton from "./BackButton";
import { hp } from "../helpers/common";
import { theme, useTheme } from "../constants/theme";

const Header = ({ title, showBackButton = true, mb = 10 }) => {
  const router = useRouter();
  const theme = useTheme();
  const colorSchema = useColorScheme();

  const titleTheme = colorSchema === "dark" ? "#F5F5F5" : "#121212";
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBackButton && (
        <View style={styles.backButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text
        style={[
          styles.title,
          { color: titleTheme, fontWeight: theme.fonts.semibold },
        ]}
      >
        {title || ""}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  title: {
    fontSize: hp(3),
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
});
