import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";

import { ProfileActionsUnion, ProfilesState, profilesReducer } from "./profiles";

export type RootAction = ProfileActionsUnion;

export interface RootState {
  profiles: ProfilesState;
}

export const reducers: ActionReducerMap<RootState> = {
  profiles: profilesReducer
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [logger] : [];

export function logger(reducer: ActionReducer<RootState, RootAction>): ActionReducer<RootState, RootAction> {
  return (state, action) => {
    const result = reducer(state, action);

    console.groupCollapsed(":: Dispatch ::", action.type);
    console.log("action", action);
    console.log("prev state", state);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}
