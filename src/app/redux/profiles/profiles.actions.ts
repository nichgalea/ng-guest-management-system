import { Action } from "@ngrx/store";

import { Profile } from "src/models";

export enum ProfilesActionTypes {
  SET = "profiles/set"
}

export class SetProfiles implements Action {
  readonly type = ProfilesActionTypes.SET;

  constructor(public payload: Profile[]) {}
}

export type ProfileActionsUnion = SetProfiles;
