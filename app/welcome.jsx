import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../helpers/common";
import { theme, useTheme } from "../constants/theme";
import Button from "../components/Button";
import { router } from "expo-router";

const Welcome = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View style={styles.container}>
        {/* Welcome image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../assets/images/welcome.png")}
        />

        {/* Title */}
        <View style={{ gap: 20 }}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.textPrimary,
                fontWeight: theme.fonts.extrabold,
              },
            ]}
          >
            Connect
          </Text>
          <Text
            style={[styles.punchline, { color: theme.colors.textSecondary }]}
          >
            Discover New Perspectives and Make Meaningful Connections Every Day.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push("signUp")}
          />
          <View style={styles.bottomTextContainer}>
            <Text
              style={[styles.loginText, { color: theme.colors.textSecondary }]}
            >
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push("login")}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.link,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: wp(4),
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: "center",
  },
  title: {
    fontSize: hp(5),
    textAlign: "center",
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(5),
    fontSize: hp(2.5),
  },
  footer: {
    gap: 30,
    width: "100%",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    fontSize: hp(1.95),
  },
});
