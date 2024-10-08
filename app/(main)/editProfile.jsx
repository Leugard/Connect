import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { hp, wp } from "../../helpers/common";
import { useTheme } from "../../constants/theme";
import Header from "../../components/Header";
import { Image } from "expo-image";
import { useAuth } from "../../context/AuthContext";
import { getUserImageSrc, uploadFile } from "../../services/imageService";
import Icon from "../../assets/icons";
import { Text } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { updateUser } from "../../services/userService";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

const EditProfile = () => {
  const { user: currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    image: "",
    bio: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || "",
        phoneNumber: currentUser.phoneNumber || "",
        image: currentUser.image || null,
        address: currentUser.address || "",
        bio: currentUser.bio || "",
      });
    }
  }, []);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    let userData = { ...user };
    let { name, phoneNumber, address, image, bio } = userData;
    setLoading(true);

    if (typeof image == "object") {
      // upload image
      let imageRes = await uploadFile("profiles", image?.uri, true);
      if (imageRes.success) userData.image = imageRes.data;
      else userData.image = null;
    }
    // Update user
    const res = await updateUser(currentUser?.id, userData);
    setLoading(false);

    if (res.success) {
      setUserData({ ...currentUser, ...userData });
      router.back();
    }
  };

  let imageSource =
    user.image && typeof user.image == "object"
      ? user.image.uri
      : getUserImageSrc(user.image);

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title="Edit Profile" />

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image
                source={imageSource}
                style={[
                  styles.avatar,
                  {
                    borderColor: theme.colors.border,
                    borderRadius: theme.radius.xxl * 1.8,
                  },
                ]}
              />
              <Pressable
                style={[
                  styles.cameraIcon,
                  { backgroundColor: theme.colors.border },
                ]}
                onPress={onPickImage}
              >
                <Icon
                  name="camera"
                  size={20}
                  strokeWidth={2.5}
                  color={theme.colors.icon}
                />
              </Pressable>
            </View>
            <Text
              style={{ fontSize: hp(2), color: theme.colors.textSecondary }}
            >
              Please fill your profile details
            </Text>
            <Input
              icon={<Icon name="user" />}
              placeholder="Enter your name"
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
            <Input
              icon={<Icon name="call" />}
              placeholder="Enter your phone number"
              value={user.phoneNumber}
              onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
            />
            <Input
              icon={<Icon name="location" />}
              placeholder="Enter your address"
              value={user.address}
              onChangeText={(value) => setUser({ ...user, address: value })}
            />
            <Input
              placeholder="Enter your bio"
              value={user.bio}
              multiline={true}
              containerStyle={styles.bio}
              onChangeText={(value) => setUser({ ...user, bio: value })}
            />

            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderCurve: "continuous",
    borderWidth: 1,
    // borderColor: theme.colors.darkLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    // shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  form: {
    gap: 18,
    marginTop: 20,
  },
  input: {
    flexDirection: "row",
    borderWidth: 0.4,
    // borderColor: theme.colors.text,
    // borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },
  bio: {
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  },
});
