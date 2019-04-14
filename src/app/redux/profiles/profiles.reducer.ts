import { Profile } from "src/models";

import { ProfilesActionTypes, ProfileActionsUnion } from "./profiles.actions";

export type ProfilesState = Profile[];

const initialProfilesState: ProfilesState = [];

export function profilesReducer(state = initialProfilesState, action: ProfileActionsUnion): ProfilesState {
  switch (action.type) {
    case ProfilesActionTypes.SET:
      return action.payload;

    default:
      return state;
  }
}
