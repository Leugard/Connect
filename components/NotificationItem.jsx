import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { hp } from "../helpers/common";
import { useTheme } from "../constants/theme";
import Avatar from "./Avatar";
import moment from "moment";

const NotificationItem = ({ item, router }) => {
  const theme = useTheme();

  const handleClick = () => {
    let { postId, commentId } = JSON.parse(item?.data);
    router.push({ pathname: "postDetails", params: { postId, commentId } });
  };

  const createdAt = moment(item?.created_at).format("MMM d");
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.borderBackground,
          borderColor: theme.colors.borderColor,
          borderRadius: theme.radius.xxl,
        },
      ]}
      onPress={handleClick}
    >
      <Avatar uri={item?.sender?.image} size={hp(5)} />
      <View style={styles.nameTitle}>
        <Text
          style={[
            styles.text,
            {
              fontWeight: theme.fonts.medium,
              color: theme.colors.textPrimary,
            },
          ]}
        >
          {item?.sender?.name}
        </Text>
        <Text
          style={[
            styles.text,
            {
              fontWeight: theme.fonts.medium,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {item?.title}
        </Text>
      </View>

      <Text style={[styles.text, { color: theme.colors.textPrimary }]}>
        {item?.createdAt}
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderWidth: 0.5,
    padding: 15,
    // paddingVertical: 12,
    borderCurve: "continuous",
  },
  nameTitle: {
    flex: 1,
    gap: 2,
  },
  text: {
    fontSize: hp(1.6),
  },
});
