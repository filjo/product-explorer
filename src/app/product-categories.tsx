import { RootView, Text } from "@/components";
import { ProductCategory } from "@/models";
import { useProductCategoriesStore } from "@/store";
import { makeStyles } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Pressable, View } from "react-native";

const ALL_CATEGORY_ITEM: ProductCategory = {
  slug: "any-category",
  name: "Any category",
  url: "",
};

export const ProductCategoriesScreen = () => {
  // Hooks
  const styles = useStyles();
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
          {isSelected ? <MaterialIcons name="check" size={24} color="#2d8f9f" /> : null}
        </Pressable>
      );
    },
    [onItemPress, selected, styles.categoryItem, styles.categoryName],
  );

  // Render
  return (
    <RootView style={styles.container} edges={["bottom"]}>
      <View style={styles.grabber} />
      <View style={styles.headerRow}>
        <Text variant="title2" style={styles.title}>
          Category
        </Text>
      </View>
      <FlashList
        data={categoriesWithAll}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Pressable style={styles.applyButton} onPress={onApplyPress}>
          <Text color="background" style={styles.applyText}>
            Apply
          </Text>
        </Pressable>

        <Pressable style={styles.resetButton} onPress={onResetPress}>
          <Text color="text" style={styles.applyText}>
            Reset
          </Text>
        </Pressable>
      </View>
    </RootView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  grabber: {
    width: 56,
    height: 6,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: theme.spacing.s3,
    backgroundColor: "#d7d7d7",
  },
  title: {
    marginTop: theme.spacing.s4,
  },
  headerRow: {
    marginTop: theme.spacing.s4,
    marginHorizontal: theme.spacing.s5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
    paddingHorizontal: theme.spacing.s5,
    paddingBottom: theme.spacing.s4,
    gap: theme.spacing.s3,
  },
  applyButton: {
    backgroundColor: "#2f8897",
    borderRadius: 10,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButton: {
    borderRadius: 10,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: {
    fontWeight: "600",
  },
}));
