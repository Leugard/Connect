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
import { theme } from "../constants/theme";
import Button from "../components/Button";
import { router } from "expo-router";

const Welcome = () => {
  const colorScheme = useColorScheme();

  const backgroundTheme = colorScheme === "dark" ? "#121212" : "#F5F5F5";
  const textTheme = colorScheme === "dark" ? "#E0E0E0" : "#333333";
  const subTextTheme = colorScheme === "dark" ? "#A0A0A0" : "#757575";
  const linkTheme = colorScheme === "dark" ? "#82B1FF" : "#1A73E8";

  return (
    <ScreenWrapper bg={backgroundTheme}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Welcome image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../assets/images/welcome.png")}
        />

        {/* Title */}
        <View style={{ gap: 20 }}>
          <Text style={[styles.title, { color: textTheme }]}>Connect</Text>
          <Text style={[styles.punchline, { color: subTextTheme }]}>
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
            <Text style={[styles.loginText, { color: subTextTheme }]}>
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push("login")}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: linkTheme,
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
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extrabold,
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(2.1),
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
