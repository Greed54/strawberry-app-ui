import gql from 'graphql-tag';
import { client } from '../configs/apollo';
import {AddTeamCommand, AmendTeamCommand} from "../../server/src/api/teams";

const ADD_STRAWBERRY_TEAM = gql`
    mutation createSTeam($data: TeamCreateInput) {
        createSTeam(data: $data)
    }
`;
const AMEND_STRAWBERRY_TEAM = gql`
    mutation updateSTeam($data: TeamUpdateInput) {
        updateSTeam(data: $data)
    }
`;

export const addStrawberryTeam = (data: AddTeamCommand) => client.mutate({ mutation: ADD_STRAWBERRY_TEAM, variables: { data } });
export const amendStrawberryTeam = (data: AmendTeamCommand) => client.mutate({ mutation: AMEND_STRAWBERRY_TEAM, variables: { data } });
