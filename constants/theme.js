import { useColorScheme } from "react-native";

const darkTheme = {
  primary: "#3498DB",
  background: "#212121",
  textPrimary: "#E0E0E0",
  textSecondary: "#A0A0A0",
  link: "#82B1FF",
  icon: "#777777",
  border: "#444444",
  logout: "#ff6e6e",
  like: "#64b5f6",
  borderBackground: "#1E1E1E",
};

const lightheme = {
  primary: "#2980B9",
  background: "#F5F5F5",
  textPrimary: "#333333",
  textSecondary: "#757575",
  link: "#1A73E8",
  icon: "#AAAAAA",
  border: "#DDDDDD",
  logout: "#e53935",
  like: "#1e88e5",
  borderBackground: "#FFFFFF",
};

export const useTheme = () => {
  const colorScheme = useColorScheme();

  return {
    colors: colorScheme === "dark" ? darkTheme : lightheme,
    fonts: {
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    radius: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 22,
    },
  };
};
