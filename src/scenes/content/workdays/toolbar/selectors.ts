import { createSelector } from 'reselect';
import {Store} from "../../../../types/store";

const periodFilter = (state: Store) => state.workDays.periodFilter;
const multiSearchOptions = (state: Store) => state.workDays.multiSearchOptions;
const periodOption = (state: Store) => state.workDays.periodOption;

export const getPeriodFilter = createSelector(
    periodFilter,
    periodFilter => {
      return periodFilter;
    }
);

export const getMultiSearchOptions = createSelector(
    multiSearchOptions,
    multiSearchOptions => {
      return multiSearchOptions;
    }
);

export const getPeriodOption = createSelector(
    periodOption,
    periodOption => {
      return periodOption;
    }
);
