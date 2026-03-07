import { CloseButton, PrimaryButton, RootView, SecondaryButton, Text } from "@/components";
import { useTheme } from "@/hooks";
import { ProductCategory } from "@/models";
import { useProductCategoriesStore } from "@/store";
import { makeStyles } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { useLayoutEffect } from "react";
import { Pressable, View } from "react-native";

const ALL_CATEGORY_ITEM: ProductCategory = {
  slug: "any-category",
  name: "Any category",
  url: "",
};

export const ProductCategoriesScreen = () => {
  // Hooks
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation = useNavigation();

  // Store
  const { categories, selectedCategorySlug, setSelectedCategorySlug, clearSelectedCategory } =
    useProductCategoriesStore();

  const categoriesWithAll = React.useMemo(() => [ALL_CATEGORY_ITEM, ...categories], [categories]);

  // State
  const [selected, setSelected] = React.useState<string | null>(selectedCategorySlug);

  // Methods
  const onItemPress = React.useCallback(
    (categorySlug: string) => {
      setSelected(categorySlug);
    },
    [setSelected],
  );

  const navigateBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onApplyPress = React.useCallback(() => {
    if (selected === ALL_CATEGORY_ITEM.slug) {
      clearSelectedCategory();
    } else {
      setSelectedCategorySlug(selected);
    }

    navigateBack();
  }, [navigateBack, selected, setSelectedCategorySlug, clearSelectedCategory]);

  const onResetPress = React.useCallback(() => {
    clearSelectedCategory();
    navigateBack();
  }, [clearSelectedCategory, navigateBack]);

  const renderItem = React.useCallback(
    ({ item }: { item: ProductCategory }) => {
      const isSelected = selected === item.slug;

      return (
        <Pressable style={styles.categoryItem} onPress={() => onItemPress(item.slug)}>
          <Text style={styles.categoryName}>{item.name}</Text>
          {isSelected ? <MaterialIcons name="check" size={24} color={colors.brand} /> : null}
        </Pressable>
      );
    },
    [colors.brand, onItemPress, selected, styles.categoryItem, styles.categoryName],
  );

  const renderHeaderRight = React.useCallback(() => {
    return <CloseButton onPress={navigateBack} />;
  }, [navigateBack]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Filter by category",
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  // Render
  return (
    <RootView edges={["bottom"]}>
      <FlashList
        data={categoriesWithAll}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <PrimaryButton title="Apply" onPress={onApplyPress} />
        <SecondaryButton title="Reset" onPress={onResetPress} />
      </View>
    </RootView>
  );
};

const useStyles = makeStyles((theme) => ({
  listContent: {
    paddingTop: theme.spacing.s4,
    paddingBottom: theme.spacing.s5,
  },
  categoryItem: {
    minHeight: 52,
    marginHorizontal: theme.spacing.s5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryName: {
    textTransform: "capitalize",
  },
  footer: {
    borderTopWidth: 2,
    borderTopColor: theme.colors.backgroundElement,
    paddingHorizontal: theme.spacing.s5,
    paddingVertical: theme.spacing.s4,
    gap: theme.spacing.s3,
  },
}));
