import gql from 'graphql-tag';
import {client} from '../configs/apollo';
import {ApolloQueryResult} from 'apollo-client';
import {StrawberryTeam} from "../types/schema-types";
import {STRAWBERRY_TEAM_FRAGMENT} from "../fragments/teamFragment";

const TEAM_LIST = gql`
    query getStrawberryTeams {
        getSTeams {
            ...StrawberryTeamForList
        }
    }
    ${STRAWBERRY_TEAM_FRAGMENT}
`;

const STRAWBERRY_TEAM_AFTER_SUB = gql`
    query getSTeam($teamId: String) {
        getSTeam(teamId: $teamId) {
            ...StrawberryTeamForList
        }
    }
    ${STRAWBERRY_TEAM_FRAGMENT}
`;

const getStrawberryTeams = (): Promise<ApolloQueryResult<StrawberryTeam>> =>
    client.query({query: TEAM_LIST});
const getTeamAfterSub = (teamId: string): Promise<ApolloQueryResult<StrawberryTeam>> =>
    client.query({query: STRAWBERRY_TEAM_AFTER_SUB, variables: {teamId}});

export {
  getStrawberryTeams,
  getTeamAfterSub
}
