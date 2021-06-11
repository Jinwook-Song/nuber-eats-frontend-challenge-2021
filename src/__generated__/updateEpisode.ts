/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateEpisode
// ====================================================

export interface updateEpisode_updateEpisode {
  __typename: "CoreOutput";
  error: string | null;
  ok: boolean;
}

export interface updateEpisode {
  updateEpisode: updateEpisode_updateEpisode;
}

export interface updateEpisodeVariables {
  input: UpdateEpisodeInput;
}
