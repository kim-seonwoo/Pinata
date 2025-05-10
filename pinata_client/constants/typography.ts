import { TextStyle } from "react-native";

type TypographyStyle = {
  [key: string]: TextStyle;
};

const typography: TypographyStyle = {
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
  },
};

export default typography;
