import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Avatar from "../../components/Avatar";
import { useAuth } from "../../context/AuthContext";
import RichTextEditor from "../../components/RichTextEditor";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import Icon from "../../assets/icons";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { getSupabaseFileUrl } from "../../services/imageService";
import { Video } from "expo-av";
import { createOrUpdatePost } from "../../services/PostService";

const NewPost = () => {
  const { user } = useAuth();

  const bodyRef = useRef("");
  const editorRef = useRef(null);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(file);

  const colorSchema = useColorScheme();

  const backgroundTheme = colorSchema === "dark" ? "#121212" : "#F5F5F5";
  const textTheme = colorSchema === "dark" ? "#F5F5F5" : "#121212";
  const subTextTheme = colorSchema === "dark" ? "#B0B0B0" : "#666666";
  const iconTheme = colorSchema === "dark" ? "#B0B0B0" : "#666666";
  const borderTheme = colorSchema === "dark" ? "#444444" : "#DDDDDD";

  const onPick = async (isImage) => {
    let mediaConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };

    if (!isImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      };
    }

    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const isLocalFile = (file) => {
    if (!file) return null;
    if (typeof file == "object") return true;

    return false;
  };

  const getFileType = (file) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.type;
    }

    // Check image or video
    if (file.includes("postImages")) {
      return "image";
    }

    return "video";
  };

  const getFileUri = (file) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.uri;
    }

    return getSupabaseFileUrl(file)?.uri;
  };

  const onSubmit = async () => {
    if (!bodyRef.current && !file) {
      Alert.alert("Post", "Please choose an image or add text");
      return;
    }

    let data = {
      file,
      body: bodyRef.current,
      userId: user?.id,
    };

    setLoading(true);
    let res = await createOrUpdatePost(data);
    setLoading(false);
    if (res.success) {
      setFile(null);
      bodyRef.current = "";
      editorRef.current?.setContentHTML("");
      router.back();
    } else {
      Alert.alert("Post", res.msg);
    }
  };

  return (
    <ScreenWrapper bg={backgroundTheme}>
      <View style={styles.container}>
        <Header title="Create Post" />
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          {/* Avatar */}
          <View style={styles.header}>
            <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
            />
            <View style={{ gap: 2 }}>
              <Text style={[styles.username, { color: textTheme }]}>
                {user && user.name}
              </Text>
              <Text style={[styles.publicText, { color: subTextTheme }]}>
                Public
              </Text>
            </View>
          </View>

          <View style={styles.textEditor}>
            <RichTextEditor
              editorRef={editorRef}
              onChange={(body) => (bodyRef.current = body)}
            />
          </View>

          {file && (
            <View style={styles.file}>
              {getFileType(file) == "video" ? (
                <Video
                  style={{ flex: 1 }}
                  source={{ uri: getFileUri(file) }}
                  useNativeControls
                  resizeMode="cover"
                  isLooping
                />
              ) : (
                <Image
                  source={{ uri: getFileUri(file) }}
                  contentFit="cover"
                  style={{ flex: 1 }}
                />
              )}

              <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
                <Icon name="delete" size={20} color="white" />
              </Pressable>
            </View>
          )}

          <View style={[styles.media, { borderColor: borderTheme }]}>
            <Text style={[styles.addImageText, { color: subTextTheme }]}>
              Add to your post
            </Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icon name="image" size={30} color={iconTheme} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icon name="video" size={33} color={iconTheme} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Button
          buttonStyle={{ height: hp(6.2) }}
          title="Post"
          loading={loading}
          hasShadow={false}
          onPress={onSubmit}
        />
      </View>
    </ScreenWrapper>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  username: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold,
  },
  avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  publicText: {
    fontSize: hp(1.9),
    fontWeight: theme.fonts.medium,
  },
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  addImageText: {
    fontSize: hp(2.7),
    fontWeight: theme.fonts.semibold,
  },
  imageIcon: {
    borderRadius: theme.radius.md,
  },
  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: "continuous",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "rgba(255,0,0,0.6)",
  },
});
