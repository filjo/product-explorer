import type { ExpoConfig } from "expo/config";

const packageName = "com.productexplorer.app";
const version = "1.0.0";
const buildNumber = 1;

// Config

const config: ExpoConfig = {
  name: "ProductExplorer",
  slug: "ProductExplorer",
  version: version,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "productexplorer",
  userInterfaceStyle: "automatic",
  ios: {
    icon: "./assets/expo.icon",
    bundleIdentifier: packageName,
    buildNumber: buildNumber.toString(),
  },
  android: {
    versionCode: buildNumber,
    package: packageName,
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },
  plugins: [
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        android: {
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: "35.0.0",
        },
        ios: {
          deploymentTarget: "18.0",
        },
      },
    ],
  ],
  experiments: {
    reactCompiler: true,
  },
};

export default config;
