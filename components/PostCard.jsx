import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../constants/theme";
import { hp, stripHtmlTags, wp } from "../helpers/common";
import Avatar from "./Avatar";
import moment from "moment";
import Icon from "../assets/icons";
import RenderHTML from "react-native-render-html";
import {
  downloadFile,
  getLocalFilePath,
  getSupabaseFileUrl,
} from "../services/imageService";
import { Image } from "expo-image";
import { Video } from "expo-av";
import { createPostLike, removePostike } from "../services/PostService";
import Loading from "./Loading";

const PostCard = ({ item, currentUser, router, hasShadow = true }) => {
  const theme = useTheme();
  const colorSchema = useColorScheme();
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setLikes(item?.postLikes);
  }, []);

  const openPostDetails = () => {
    router.push({ pathname: "postDetails", params: { postId: item?.id } });
  };

  const onLike = async () => {
    if (liked) {
      let updatedLikes = likes.filter((like) => like.userId != currentUser?.id);

      setLikes([...updatedLikes]);
      let res = await removePostike(item?.id, currentUser?.id);
      console.log("removed like: ", res);
      if (!res.success) {
        Alert.alert("Post", "Something went wrong!");
      }
    } else {
      let data = {
        userId: currentUser?.id,
        postId: item?.id,
      };
      setLikes([...likes, data]);
      let res = await createPostLike(data);
      console.log("added like: ", res);
      if (!res.success) {
        Alert.alert("Post", "Something went wrong!");
      }
    }
  };

  const onShare = async () => {
    let content = { message: stripHtmlTags(item?.body) };
    if (item?.file) {
      setLoading(true);
      let url = await downloadFile(getSupabaseFileUrl(item?.file).uri);
      setLoading(false);
      content.url = url;
    }
    Share.share(content);
  };

  const createdAt = moment(item?.created_at).format("MMM D");
  const liked = likes.filter((like) => like.userId == currentUser?.id)[0]
    ? true
    : false;

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
            style={[styles.postMedia, { borderRadius: theme.radius.xl }]}
            contentFit="cover"
          />
        )}

        {/* Post video */}
        {item?.file && item?.file?.includes("postVideos") && (
          <Video
            style={[
              styles.postMedia,
              { height: hp(30), borderRadius: theme.radius.xl },
            ]}
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
          <TouchableOpacity onPress={onLike}>
            <Icon
              name="heart"
              size={24}
              fill={liked ? theme.colors.like : "transparent"}
              color={liked ? theme.colors.like : subTextTheme}
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
          {loading ? (
            <Loading size="small" />
          ) : (
            <TouchableOpacity onPress={onShare}>
              <Icon name="share" size={24} color={subTextTheme} />
            </TouchableOpacity>
          )}
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
