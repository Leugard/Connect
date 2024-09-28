import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { hp } from "../helpers/common";
import Avatar from "./Avatar";
import { useTheme } from "../constants/theme";
import moment from "moment";
import Icon from "../assets/icons";

const CommentItem = ({
  item,
  canDelete = false,
  onDelete = () => {},
  highlight = false,
}) => {
  const theme = useTheme();
  const createdAt = moment(item?.created_at).format("MMM d");

  const handleDelete = () => {
    Alert.alert("Confirm", "Are you sure want to delete?", [
      {
        text: "Cancel",
        onPress: () => console.log("modal cancelled"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete(item),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Avatar uri={item?.user?.image} />
      <View
        style={[
          styles.content,
          highlight &&
            styles.highlight && {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.borderBackground,
            },
          {
            backgroundColor: theme.colors.borderBackground,
            borderRadius: theme.radius.md,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: theme.fonts.medium,
                  color: theme.colors.textPrimary,
                },
              ]}
            >
              {item?.user?.name}
            </Text>
            <Text style={{ color: theme.colors.textPrimary }}>•</Text>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: theme.fonts.medium,
                  color: theme.colors.textSecondary,
                },
              ]}
            >
              {createdAt}
            </Text>
          </View>
          {canDelete && (
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="delete" size={20} color={theme.colors.logout} />
            </TouchableOpacity>
          )}
        </View>
        <Text
          style={[
            styles.text,
            {
              fontWeight: "normal",
              color: theme.colors.textPrimary,
            },
          ]}
        >
          {item?.text}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 7,
  },
  content: {
    flex: 1,
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderCurve: "continuous",
  },
  highlight: {
    borderWidth: 0.2,
    // backgroundColor: "white",
    // borderColor: theme.colors.dark,
    // shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  text: {
    fontSize: hp(1.6),
  },
});
