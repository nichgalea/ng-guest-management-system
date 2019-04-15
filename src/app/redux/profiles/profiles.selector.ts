import { createSelector } from "@ngrx/store";

import { Profile } from "src/models";

import { ProfilesState } from "./profiles.reducer";

export const selectProfiles = (state: ProfilesState): Profile[] => state;

export const reduceToProfileMap = createSelector<ProfilesState, Profile[], Record<string, Profile>>(
  selectProfiles,
  state => {
    return state.reduce((acc, p) => {
      acc[p.localid] = p;
      return acc;
    }, {});
  }
);

export const getProfileById = createSelector<ProfilesState, string, Record<string, Profile>, Profile>(
  reduceToProfileMap,
  (map, id) => map[id]
);
