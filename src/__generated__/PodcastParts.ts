/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastParts
// ====================================================

export interface PodcastParts_episodes {
  __typename: "Episode";
  title: string;
  category: string;
}

export interface PodcastParts_reviews {
  __typename: "Review";
  title: string;
  text: string;
}

export interface PodcastParts {
  __typename: "Podcast";
  title: string;
  category: string;
  rating: number;
  episodes: PodcastParts_episodes[];
  reviews: PodcastParts_reviews[];
}
