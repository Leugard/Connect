import { View } from "react-native";
import React from "react";
import Loading from "../components/Loading";
import { useTheme } from "@react-navigation/native";

const index = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Loading />
    </View>
  );
};

export default index;
