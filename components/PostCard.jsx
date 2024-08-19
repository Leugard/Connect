import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import { theme, useTheme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import Avatar from "./Avatar";
import moment from "moment";
import Icon from "../assets/icons";
import RenderHTML from "react-native-render-html";
import { getSupabaseFileUrl } from "../services/imageService";
import { Image } from "expo-image";
import { Video } from "expo-av";

const PostCard = ({ item, currentUser, router, hasShadow = true }) => {
  const theme = useTheme();
  const colorSchema = useColorScheme();

  const backgroundTheme = colorSchema === "dark" ? "#1E1E1E" : "#FFFFFF";
  const textTheme = colorSchema === "dark" ? "#F5F5F5" : "#121212";
  const subTextTheme = colorSchema === "dark" ? "#B0B0B0" : "#666666";
  const iconTheme = colorSchema === "dark" ? "#F5F5F5" : "#121212";
  const borderTheme = colorSchema === "dark" ? "#444444" : "#DDDDDD";

  const shadowStyle = {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };

  const textStyle = {
    color: textTheme,
    fontSize: hp(2),
  };

  const tagsStyles = {
    div: textStyle,
    p: textStyle,
    ol: textStyle,
    h1: {
      color: textTheme,
    },
    h4: {
      color: textTheme,
    },
  };

  const openPostDetails = () => {};

  const createdAt = moment(item?.created_at).format("MMM D");
  const likes = [];
  const liked = false;

  return (
    <View
      style={[
        styles.container,
        hasShadow && shadowStyle,
        {
          backgroundColor: backgroundTheme,
          borderColor: borderTheme,
          borderRadius: theme.radius.xxl * 1.1,
        },
      ]}
    >
      <View style={styles.header}>
        {/* User info and post time */}
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={item?.user?.image}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text
              style={[
                styles.username,
                { color: textTheme, fontWeight: theme.fonts.medium },
              ]}
            >
              {item?.user?.name}
            </Text>
            <Text
              style={[
                styles.postTime,
                { color: subTextTheme, fontWeight: theme.fonts.medium },
              ]}
            >
              {createdAt}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={openPostDetails}>
          <Icon
            name="threeDotsHorizontal"
            size={hp(3.4)}
            strokeWidth={3}
            color={iconTheme}
          />
        </TouchableOpacity>
      </View>

      {/* Post body & media */}

      <View style={styles.content}>
        <View style={styles.postBody}>
          {item?.body && (
            <RenderHTML
              contentWidth={wp(100)}
              source={{ html: item?.body }}
              tagsStyles={tagsStyles}
            />
          )}
        </View>

        {/* Post image */}
        {item?.file && item?.file?.includes("postImages") && (
          <Image
            source={getSupabaseFileUrl(item?.file)}
            transition={100}
            style={styles.postMedia}
            contentFit="cover"
          />
        )}

        {/* Post video */}
        {item?.file && item?.file?.includes("postVideos") && (
          <Video
            style={[styles.postMedia, { height: hp(30) }]}
            source={getSupabaseFileUrl(item?.file)}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
        )}
      </View>

      {/* Like, comment & share */}
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon
              name="heart"
              size={24}
              fill={liked ? theme.colors.rose : "transparent"}
              color={liked ? theme.colors.rose : subTextTheme}
            />
          </TouchableOpacity>
          <Text style={[styles.count, { color: subTextTheme }]}>
            {likes?.length}
          </Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon name="comment" size={24} color={subTextTheme} />
          </TouchableOpacity>
          <Text style={[styles.count, { color: subTextTheme }]}>0</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon name="share" size={24} color={subTextTheme} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderCurve: "continuous",
    padding: 10,
    paddingVertical: 12,
    borderWidth: 0.5,
    shadowColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  username: {
    fontSize: hp(2.1),
  },
  postTime: {
    fontSize: hp(1.8),
  },
  content: {
    gap: 10,
  },
  postMedia: {
    height: hp(40),
    width: "100%",
    // borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  postBody: {
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  count: {
    fontSize: hp(1.8),
  },
});
