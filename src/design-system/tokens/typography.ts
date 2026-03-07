import type { TextStyle } from "react-native";

import { fonts } from "./fonts";

type TypographyStyle = Pick<TextStyle, "fontFamily" | "fontSize" | "lineHeight" | "fontWeight">;
export type IOSTypographyName =
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption1"
  | "caption2"
  | "code";

export const typography: Record<IOSTypographyName, TypographyStyle> = {
  // iOS semantic typography naming
  largeTitle: { fontFamily: fonts.sans, fontSize: 34, lineHeight: 41, fontWeight: "700" },
  title1: { fontFamily: fonts.sans, fontSize: 28, lineHeight: 34, fontWeight: "700" },
  title2: { fontFamily: fonts.sans, fontSize: 22, lineHeight: 28, fontWeight: "700" },
  title3: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 25, fontWeight: "600" },
  headline: { fontFamily: fonts.sans, fontSize: 17, lineHeight: 22, fontWeight: "600" },
  body: { fontFamily: fonts.sans, fontSize: 17, lineHeight: 22, fontWeight: "400" },
  callout: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 21, fontWeight: "400" },
  subhead: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 20, fontWeight: "400" },
  footnote: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, fontWeight: "400" },
  caption1: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 16, fontWeight: "400" },
  caption2: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 13, fontWeight: "400" },
  code: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 18, fontWeight: "500" },
};
