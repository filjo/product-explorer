import { ScrollView, View, useWindowDimensions } from "react-native";

import { makeStyles } from "@/utils";
import { Image } from "expo-image";

type ProductImagesCarouselProps = {
  images: string[];
};

const HEIGHT = 400;

export const ProductImagesCarousel = ({ images }: ProductImagesCarouselProps) => {
  const styles = useStyles();
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      style={styles.scrollView}
      horizontal
      pagingEnabled
      scrollEnabled={images.length > 1}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {images.map((uri, index) => (
        <View key={`${uri}-${index}`} style={[styles.slide, { width }]}>
          <Image source={{ uri }} style={styles.image} contentFit="contain" />
        </View>
      ))}
    </ScrollView>
  );
};

// Styles
const useStyles = makeStyles((theme) => ({
  scrollView: {
    paddingTop: theme.spacing.s4,
    width: "100%",
    height: HEIGHT,
  },
  content: {
    alignItems: "center",
  },
  slide: {
    padding: theme.spacing.s4,
  },
  image: {
    width: "100%",
    height: HEIGHT,
  },
}));
