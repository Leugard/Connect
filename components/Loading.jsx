import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/theme";
const Loading = ({ size = "large", color = "#3498DB" }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
