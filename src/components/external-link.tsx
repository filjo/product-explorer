import { openBrowserAsync, WebBrowserPresentationStyle } from "expo-web-browser";
import { type ReactElement, cloneElement, isValidElement } from "react";
import { Linking, Pressable, type GestureResponderEvent } from "react-native";

type Props = {
  href: string;
  asChild?: boolean;
  children: ReactElement;
};

async function handleExternalLinkPress(href: string, event?: GestureResponderEvent) {
  if (process.env.EXPO_OS === "web") {
    await Linking.openURL(href);
    return;
  }

  event?.preventDefault();
  await openBrowserAsync(href, {
    presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
  });
}

export function ExternalLink({ href, asChild = false, children }: Props) {
  if (asChild && isValidElement<{ onPress?: (event: GestureResponderEvent) => void }>(children)) {
    const childOnPress = children.props.onPress as
      | ((event: GestureResponderEvent) => void)
      | undefined;

    return cloneElement(children, {
      onPress: (event: GestureResponderEvent) => {
        childOnPress?.(event);
        void handleExternalLinkPress(href, event);
      },
    });
  }

  return (
    <Pressable onPress={(event) => void handleExternalLinkPress(href, event)}>{children}</Pressable>
  );
}
