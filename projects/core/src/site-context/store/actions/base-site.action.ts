import { Action } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';

export const SET_ACTIVE_BASE_SITE = '[Site-context] Set Active BaseSite';
export const SET_ACTIVE_BASE_SITE_FAIL =
  '[Site-context] Set Active BaseSite Fail';
export const SET_ACTIVE_BASE_SITE_SUCCESS =
  '[Site-context] Set Active BaseSite Success';
export const BASE_SITE_CHANGE = '[Site-context] BaseSite Change';

export class SetActiveBaseSite implements Action {
  readonly type = SET_ACTIVE_BASE_SITE;
  constructor(public payload: string) {}
}

export class SetActiveBaseSiteFail implements Action {
  readonly type = SET_ACTIVE_BASE_SITE_FAIL;
  constructor(public payload: any) {}
}

export class SetActiveBaseSiteSuccess implements Action {
  readonly type = SET_ACTIVE_BASE_SITE_SUCCESS;
  constructor(public payload: BaseSite) {}
}

export class BaseSiteChange implements Action {
  readonly type = BASE_SITE_CHANGE;
}

// action types
export type BaseSiteAction =
  | SetActiveBaseSite
  | SetActiveBaseSiteFail
  | SetActiveBaseSiteSuccess
  | BaseSiteChange;
