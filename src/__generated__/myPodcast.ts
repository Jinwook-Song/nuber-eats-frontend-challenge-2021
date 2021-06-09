/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyPodcastInputType } from "./globalTypes";

// ====================================================
// GraphQL query operation: myPodcast
// ====================================================

export interface myPodcast_myPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
}

export interface myPodcast_myPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
}

export interface myPodcast_myPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number;
  episodes: myPodcast_myPodcast_podcast_episodes[] | null;
  reviews: myPodcast_myPodcast_podcast_reviews[] | null;
}

export interface myPodcast_myPodcast {
  __typename: "MyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: myPodcast_myPodcast_podcast | null;
}

export interface myPodcast {
  myPodcast: myPodcast_myPodcast;
}

export interface myPodcastVariables {
  input: MyPodcastInputType;
}
