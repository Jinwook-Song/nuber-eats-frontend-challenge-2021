/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  category: string;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  category: string;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface EpisodesSearchInput {
  podcastId: number;
  episodeId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MyEpisodeInputType {
  id: number;
  podcastId: number;
}

export interface MyPodcastInputType {
  id: number;
}

export interface PodcastSearchInput {
  id: number;
}

export interface UpdateEpisodeInput {
  podcastId: number;
  episodeId: number;
  title?: string | null;
  category?: string | null;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  category?: string | null;
  rating?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
