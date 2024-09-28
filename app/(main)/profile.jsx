import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import { hp, wp } from "../../helpers/common";
import Icon from "../../assets/icons";
import { theme, useTheme } from "../../constants/theme";
import { Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import Avatar from "../../components/Avatar";
import { StatusBar } from "expo-status-bar";
import { fetchPosts } from "../../services/PostService";
import { FlatList } from "react-native";
import Loading from "../../components/Loading";
import PostCard from "../../components/PostCard";

var limit = 0;
const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { user, setAuth } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const colorSchema = useColorScheme();

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Sign out", "Error signing out!");
    }
  };

  const getPosts = async () => {
    if (!hasMore) return null;
    limit = limit + 10;

    let res = await fetchPosts(limit, user.id);
    if (res.success) {
      if (posts.length == res.data.length) setHasMore(false);
      setPosts(res.data);
    }
  };

  const handleLogout = async () => {
    // Show confirm modal
    Alert.alert("Confirm", "Are you sure want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("modal cancelled"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => onLogout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <StatusBar style={colorSchema === "dark" ? "light" : "dark"} />

      <FlatList
        data={posts}
        ListHeaderComponent={
          <UserHeader
            user={user}
            router={router}
            handleLogout={handleLogout}
            bg={theme.colors.background}
          />
        }
        ListHeaderComponentStyle={{ marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard item={item} currentUser={user} router={router} />
        )}
        onEndReached={() => {
          getPosts();
          console.log("Got to the end");
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={
          hasMore ? (
            <View style={{ marginVertical: posts.length == 0 ? 100 : 30 }}>
              <Loading />
            </View>
          ) : (
            <View style={{ marginVertical: 30 }}>
              <Text
                style={[styles.noPosts, { color: theme.colors.textSecondary }]}
              >
                No more posts
              </Text>
            </View>
          )
        }
      />
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router, handleLogout, bg }) => {
  const theme = useTheme();
  const colorSchema = useColorScheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: { bg }, paddingHorizontal: wp(4) }}
    >
      <View>
        <Header title="Profile" mb={30} />
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: theme.colors.border,
              borderRadius: theme.radius.sm,
            },
          ]}
          onPress={handleLogout}
        >
          <Icon name="logout" color={theme.colors.logout} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
            <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xxl * 1.4}
            />
            <Pressable
              style={[
                styles.editIcon,
                {
                  backgroundColor: theme.colors.background,
                  shadowColor: theme.colors.textPrimary,
                },
              ]}
              onPress={() => router.push("editProfile")}
            >
              <Icon
                name="edit"
                strokeWidth={2.5}
                size={20}
                color={theme.colors.icon}
              />
            </Pressable>
          </View>

          {/* Username & Address */}
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text
              style={[styles.username, { color: theme.colors.textPrimary }]}
            >
              {user && user.name}
            </Text>
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              {user && user.address}
            </Text>
          </View>

          {/* Email, phone, bio */}
          <View style={{ gap: 10 }}>
            <View style={[styles.info]}>
              <Icon name="mail" size={20} color={theme.colors.icon} />
              <Text
                style={[styles.infoText, { color: theme.colors.textSecondary }]}
              >
                {user && user.email}
              </Text>
            </View>
            {user && user.phoneNumber && (
              <View style={styles.info}>
                <Icon name="call" size={20} color={theme.colors.icon} />
                <Text
                  style={[
                    styles.infoText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {user && user.phoneNumber}
                </Text>
              </View>
            )}
            {user && user.bio && (
              <Text
                style={[styles.infoText, { color: theme.colors.textSecondary }]}
              >
                {user.bio}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20,
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  username: {
    fontSize: hp(3),
    fontWeight: "500",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.8),
    fontWeight: "500",
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30,
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
  },
});
