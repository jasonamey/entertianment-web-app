// category: "TV Series"
// id: "i4ppfHJ437sQv3oZFy5B"
// isBookmarked: false
// isTrending: true
// rating: "E"
// thumbnail: {trending: {…}, regular: {…}}
// title: "Undiscovered Cities"
// year: 2019

type photoFileSizes = {
  small: string;
  large: string;
  medium?: string;
};

type photoFiletypes = {
  regular: photoFileSizes;
  trending?: photoFileSizes;
};

type thumbnailType = photoFiletypes;

export type MediaContent = {
  category: string;
  id: string;
  isBookmarked: boolean;
  isTrending: boolean;
  rating: string;
  thumbnail: thumbnailType;
  title: string;
  year: number;
};
