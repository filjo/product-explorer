import { makeStyles } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const STAR_COUNT = 5;
const STAR_SIZE = 12;
const STAR_GAP = 2;
const STAR_ROW_WIDTH = STAR_COUNT * STAR_SIZE + (STAR_COUNT - 1) * STAR_GAP;

type RatingViewProps = {
  rating: number;
  reviewCount?: number;
  size?: number;
};

const getRatingFillWidth = (rating: number) => {
  const clampedRating = Math.max(0, Math.min(STAR_COUNT, rating));
  return (clampedRating / STAR_COUNT) * STAR_ROW_WIDTH;
};

const RatingViewComponent = ({ rating, reviewCount = 0, size = STAR_SIZE }: RatingViewProps) => {
  const styles = useStyles();

  return (
    <View style={styles.row}>
      <View style={styles.starsContainer}>
        <View style={styles.starsRow}>
          {Array.from({ length: STAR_COUNT }).map((_, index) => (
            <MaterialIcons
              key={`empty-star-${index}`}
              name="star-border"
              size={size}
              color="#C5C5C5"
            />
          ))}
        </View>

        <View style={[styles.starsOverlay, { width: getRatingFillWidth(rating) }]}>
          <View style={styles.starsRow}>
            {Array.from({ length: STAR_COUNT }).map((_, index) => (
              <MaterialIcons key={`filled-star-${index}`} name="star" size={size} color="#111111" />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      {reviewCount > 0 ? <Text style={styles.ratingText}>({reviewCount})</Text> : null}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  row: {
    marginTop: theme.spacing.s2,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s1,
  },
  starsContainer: {
    width: STAR_ROW_WIDTH,
    height: STAR_SIZE,
    position: "relative",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: STAR_GAP,
  },
  starsOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "bold",
    color: theme.colors.text,
  },
}));

export const RatingView = React.memo(RatingViewComponent);
