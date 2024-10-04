export type PodcastDetail = {
  wrapperType: string;
  kind: string;
  artistId?: number;
  collectionId: number;
  trackId?: number;
  artistName?: string;
  collectionName: string;
  trackName?: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  feedUrl?: string;
  trackViewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  collectionHdPrice?: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness?: string;
  trackCount?: number;
  trackTimeMillis?: number;
  country: string;
  currency: string;
  primaryGenreName?: string;
  contentAdvisoryRating?: string;
  artworkUrl600?: string;
  genreIds?: string[];
  genres?: string[];
};

export type Episode = {
  country: string;
  artworkUrl160?: string;
  episodeFileExtension?: string;
  episodeContentType?: string;
  artworkUrl600?: string;
  previewUrl?: string;
  closedCaptioning?: string;
  collectionId: number;
  collectionName: string;
  episodeUrl: string;
  genres?: { name: string; id: string }[];
  episodeGuid?: string;
  trackId: number;
  trackName: string;
  artistIds?: number[];
  shortDescription?: string;
  feedUrl: string;
  description: string;
  releaseDate: string;
  contentAdvisoryRating?: string;
  trackViewUrl?: string;
  collectionViewUrl?: string;
  trackTimeMillis?: number; // some episodes don't have trackTimeMillis!
  artistViewUrl?: string;
  artworkUrl60?: string;
  kind: string;
  wrapperType: string;
};

export type PodcastDetailResponse = {
  resultCount: number;
  results: (PodcastDetail | Episode)[];
};
