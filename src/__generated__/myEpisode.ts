/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyEpisodeInputType } from "./globalTypes";

// ====================================================
// GraphQL query operation: myEpisode
// ====================================================

export interface myEpisode_myEpisode_episode {
  __typename: "Episode";
  title: string;
  category: string;
}

export interface myEpisode_myEpisode {
  __typename: "MyEpisodeOutput";
  error: string | null;
  ok: boolean;
  episode: myEpisode_myEpisode_episode | null;
}

export interface myEpisode {
  myEpisode: myEpisode_myEpisode;
}

export interface myEpisodeVariables {
  input: MyEpisodeInputType;
}
