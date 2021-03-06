/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPodcasts
// ====================================================

export interface myPodcasts_myPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
}

export interface myPodcasts_myPodcasts_podcasts_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
}

export interface myPodcasts_myPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number;
  episodes: myPodcasts_myPodcasts_podcasts_episodes[] | null;
  reviews: myPodcasts_myPodcasts_podcasts_reviews[] | null;
}

export interface myPodcasts_myPodcasts {
  __typename: "MyPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: myPodcasts_myPodcasts_podcasts[] | null;
}

export interface myPodcasts {
  myPodcasts: myPodcasts_myPodcasts;
}
