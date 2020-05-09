import gql from 'graphql-tag';
import {client} from '../configs/apollo';
import {ApolloQueryResult} from 'apollo-client';
import {MultiSearchWorkDaysOptions} from "../types/schema-types";

const GET_WORK_DAYS_MULTI_SEARCH_OPTIONS = gql`
    query getMultiSearchWorkDaysOptions($searchValue: String) {
        getSEmployeeOptions(searchValue: $searchValue) {
            cardId
            firstName
            lastName
            note
            team {
                teamName
            }
        }
    }
`;

export const getSearchWorkDaysOptions = (searchValue: string): Promise<ApolloQueryResult<MultiSearchWorkDaysOptions>> =>
    client.query({query: GET_WORK_DAYS_MULTI_SEARCH_OPTIONS, variables: {searchValue}});
