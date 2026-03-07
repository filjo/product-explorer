import { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";

type Navigate = {
  <TScreen extends keyof RootStackParamList>(
    screen: TScreen,
    ...args: undefined extends RootStackParamList[TScreen]
      ? [params?: RootStackParamList[TScreen]]
      : [params: RootStackParamList[TScreen]]
  ): void;
};

export const useRouter = () => {
  const navigation = useNavigation();

  const navigate: Navigate = (screen, ...args) => {
    const params = args[0];

    (navigation as any).navigate(screen, params);
  };

  const goBack = () => {
    (navigation as any).goBack();
  };

  const canGoBack = () => {
    return (navigation as any).canGoBack();
  };

  return {
    navigate,
    goBack,
    canGoBack,
  };
};
