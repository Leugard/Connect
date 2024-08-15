import { StyleSheet, Text, useColorScheme, View } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { theme } from "../constants/theme";

const RichTextEditor = ({ editorRef, onChange }) => {
  const colorSchema = useColorScheme();

  const backgroundTheme = colorSchema === "dark" ? "#1E1E1E" : "#FFFFFF";
  const selectedTheme = colorSchema === "dark" ? "#1A73E8" : "#D6EAF8";
  const borderTheme = colorSchema === "dark" ? "#444444" : "#DDDDDD";
  const textTheme = colorSchema === "dark" ? "#E0E0E0" : "#333333";
  const placeholderTheme = colorSchema === "dark" ? "#777777" : "#AAAAAA";
  const editorTheme = colorSchema === "dark" ? "#121212" : "#FFFFFF";
  return (
    <View style={{ minHeight: 285 }}>
      <RichToolbar
        actions={[
          actions.removeFormat,
          actions.blockquote,
          actions.code,
          actions.heading1,
          actions.heading4,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }) => (
            <Text style={{ color: tintColor }}>H1</Text>
          ),
          [actions.heading4]: ({ tintColor }) => (
            <Text style={{ color: tintColor }}>H4</Text>
          ),
        }}
        style={[styles.richBar, { backgroundColor: backgroundTheme }]}
        flatContainerStyle={styles.listStyle}
        selectedIconTint={selectedTheme}
        editor={editorRef}
        disable={false}
      />

      <RichEditor
        ref={editorRef}
        containerStyle={[styles.rich, { borderColor: borderTheme }]}
        editorStyle={[styles.contentStyle, { color: textTheme }]}
        placeholder={"What's on your mind"}
        placeholderColor={placeholderTheme}
        onChange={onChange}
      />
    </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
  },
  rich: {
    minHeight: 240,
    flex: 1,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomEndRadius: theme.radius.xl,
    padding: 5,
  },
  containerStyle: {
    placeholderColor: "gray",
  },
  flatStyle: {
    paddingHorizontal: 8,
    gap: 3,
  },
});
