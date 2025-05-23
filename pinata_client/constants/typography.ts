import { TextStyle } from "react-native";

type TypographyStyle = {
  [key: string]: TextStyle;
};

const typography: TypographyStyle = {
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    color: "white",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    color: "white",
  },
  h3: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28,
    color: "white",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    color: "white",
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    color: "white",
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: "white",
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
    color: "white",
  },
};

export default typography;
