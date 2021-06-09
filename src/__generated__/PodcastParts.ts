/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastParts
// ====================================================

export interface PodcastParts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
}

export interface PodcastParts_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
}

export interface PodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number;
  episodes: PodcastParts_episodes[] | null;
  reviews: PodcastParts_reviews[] | null;
}
