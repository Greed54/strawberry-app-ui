import gql from 'graphql-tag';
import {client} from '../configs/apollo';
import {ApolloQueryResult} from 'apollo-client';
import {StrawberryTeam} from "../types/schema-types";

const EMPLOYEE_LIST_BY_TEAM_ID = gql`
    query getSEmployeesByTeamId($teamId: String) {
        getSEmployeesByTeamId(teamId: $teamId) {
            coreID
            cardId
            firstName
            lastName
            employeeRole
            note
            team {
                coreID
            }
        }
    }
`;

const getStrawberryEmployees = (teamId: string): Promise<ApolloQueryResult<StrawberryTeam>> =>
    client.query({query: EMPLOYEE_LIST_BY_TEAM_ID, variables: { teamId } });

export {
  getStrawberryEmployees
}
