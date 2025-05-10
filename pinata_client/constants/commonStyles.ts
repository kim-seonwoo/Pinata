import { StyleSheet } from "react-native";
import spacing from "./spacing";
import typography from "./typography";
import colors from "./Colors";

const commonStyles = StyleSheet.create({
  buttonLarge: {
    backgroundColor: colors.primaryPurple,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonMedium: {
    backgroundColor: colors.primaryPurple,
    width: 160,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSmall: {
    backgroundColor: colors.primaryPurple,
    width: 90,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonTextLarge: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextMedium: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  buttonTextSmall: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  sectionBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.m,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    ...typography.h1,
    color: colors.black,
  },
  subtitleText: {
    ...typography.h2,
    color: colors.black,
  },
  bodyText: {
    ...typography.body,
    color: colors.black,
  },
  bodyBoldText: {
    ...typography.bodyBold,
    color: colors.black,
  },
  captionText: {
    ...typography.caption,
    color: colors.grayscaleGray5,
  },
  errorText: {
    ...typography.body,
    color: "red",
  },
});

export default commonStyles;
