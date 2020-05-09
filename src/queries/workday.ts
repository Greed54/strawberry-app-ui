import gql from 'graphql-tag';
import {client} from '../configs/apollo';
import {ApolloQueryResult} from 'apollo-client';
import {STRAWBERRY_WORK_DAY_FRAGMENT} from "../fragments/workDayFragment";
import {StrawberryWorkDay, WorkDaysListFilter} from "../types/schema-types";

const WORK_DAYS_LIST = gql`
    query getSWorkDays($filter: WorkDaysListFilter) {
        getSWorkDays(filter: $filter) {
            ...StrawberryWorkDayForList
        }
    }
    ${STRAWBERRY_WORK_DAY_FRAGMENT}
`;

const getWorkDaysList = (filter: WorkDaysListFilter): Promise<ApolloQueryResult<StrawberryWorkDay>> =>
    client.query({query: WORK_DAYS_LIST, variables: {filter}});

export {
  getWorkDaysList
}
