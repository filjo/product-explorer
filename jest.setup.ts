import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  const MockIcon = ({ name, ...props }: { name?: string }) =>
    React.createElement(Text, props, name ?? "icon");

  return {
    MaterialIcons: MockIcon,
  };
});

jest.mock("react-native-mmkv", () => {
  const storage = new Map<string, string>();

  return {
    createMMKV: () => ({
      set: (key: string, value: string) => {
        storage.set(key, value);
      },
      getString: (key: string) => storage.get(key),
      remove: (key: string) => {
        storage.delete(key);
      },
    }),
  };
});
