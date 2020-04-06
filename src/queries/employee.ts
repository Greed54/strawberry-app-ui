import gql from 'graphql-tag';
import {client} from '../configs/apollo';
import {ApolloQueryResult} from 'apollo-client';
import {StrawberryEmployee} from "../types/schema-types";
import {STRAWBERRY_EMPLOYEE_FRAGMENT} from "../fragments/employeeFragment";

const EMPLOYEE_LIST_BY_TEAM_ID = gql`
    query getSEmployeesByTeamId($teamId: String) {
        getSEmployeesByTeamId(teamId: $teamId) {
            ...StrawberryEmployeeForList
        }
    }
    ${STRAWBERRY_EMPLOYEE_FRAGMENT}
`;

const STRAWBERRY_EMPLOYEE_AFTER_SUB = gql`
    query getSEmployee($employeeId: String) {
        getSEmployee(employeeId: $employeeId) {
            ...StrawberryEmployeeForList
        }
    }
    ${STRAWBERRY_EMPLOYEE_FRAGMENT}
`;

const getStrawberryEmployees = (teamId: string): Promise<ApolloQueryResult<StrawberryEmployee>> =>
    client.query({query: EMPLOYEE_LIST_BY_TEAM_ID, variables: {teamId}});
const getStrawberryEmployeeAfterSub = (employeeId: string): Promise<ApolloQueryResult<StrawberryEmployee>> =>
    client.query({query: STRAWBERRY_EMPLOYEE_AFTER_SUB, variables: {employeeId}});

export {
  getStrawberryEmployees,
  getStrawberryEmployeeAfterSub
}
