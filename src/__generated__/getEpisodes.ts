/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodes
// ====================================================

export interface getEpisodes_getEpisodes_episodes {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number;
}

export interface getEpisodes_getEpisodes {
  __typename: "EpisodesOutput";
  error: string | null;
  ok: boolean;
  episodes: getEpisodes_getEpisodes_episodes[] | null;
}

export interface getEpisodes {
  getEpisodes: getEpisodes_getEpisodes;
}

export interface getEpisodesVariables {
  input: PodcastSearchInput;
}
