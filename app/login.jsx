import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React, { useRef } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import Icon from "../assets/icons";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import { useRouter } from "expo-router";
import { hp, wp } from "../helpers/common";
import { useTheme } from "../constants/theme";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";

const Login = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the blanks field!");
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Login", error.message);
    }
  };

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome */}
        <View>
          <Text
            style={[
              styles.welcomeText,
              { color: theme.colors.textPrimary, fontWeight: theme.fonts.bold },
            ]}
          >
            Hey,
          </Text>
          <Text
            style={[
              styles.welcomeText,
              { color: theme.colors.textPrimary, fontWeight: theme.fonts.bold },
            ]}
          >
            Welcome Back
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(2), color: theme.colors.textSecondary }}>
            Please login to continue
          </Text>
          <Input
            icon={
              <Icon
                name="mail"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.icon}
              />
            }
            placeholder="Enter your Email"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={
              <Icon
                name="lock"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.icon}
              />
            }
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
          />
          <Text
            style={[
              styles.forgotPassword,
              {
                color: theme.colors.textSecondary,
                fontWeight: theme.fonts.semibold,
              },
            ]}
          >
            Forgot Password?
          </Text>

          {/* Button */}
          <Button title="Login" loading={loading} onPress={onSubmit} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            style={[styles.footerText, { color: theme.colors.textSecondary }]}
          >
            Don't have an Account?
          </Text>
          <Pressable onPress={() => router.push("signUp")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.link,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    // color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    // color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    // color: theme.colors.text,
    fontSize: hp(1.8),
  },
});
