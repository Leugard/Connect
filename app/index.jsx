import { View, Text, Button, useColorScheme } from "react-native";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";

const index = () => {
  const router = useRouter();
  const colorSchema = useColorScheme();

  const backgroundTheme = colorSchema === "dark" ? "#121212" : "#F5F5F5";

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundTheme,
      }}
    >
      <Loading />
    </View>
  );
};

export default index;
