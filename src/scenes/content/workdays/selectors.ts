import {Store} from "../../../types/store";
import { createSelector } from 'reselect';
import moment from "moment";
import {DATE_FORMAT} from "../../../configs/const";
import {WorkDaysType} from "../../../types/schema-types";
import { mapValues, groupBy, map } from "lodash";

export const getWorkDaysListSelector = (state: Store) => state.workDays;

export const getWorkDaysListFilters = createSelector(
    getWorkDaysListSelector,
    ({search, filters, periodFilter}) => {
      return {
        ...mapValues(groupBy(search, 'id'), array =>
            map(array, i => (i.value))
        ),
        dateFrom: moment
        .utc(periodFilter[0], DATE_FORMAT)
        .startOf('d')
        .toISOString(),
        dateTo: moment
        .utc(periodFilter[1], DATE_FORMAT)
        .endOf('d')
        .toISOString(),
        ...filters,
      }
    }
);

export const groupingTransform = {
  date: (x: WorkDaysType) => moment.utc(x.date).format(DATE_FORMAT)
};
