import gql from 'graphql-tag';
import {client} from '../configs/apollo';

export const UPDATE_STRAWBERRY_TEAMS_ANY = gql`
    subscription updateStrawberryTeamAny($filters: TeamListFilter) {
        updateStrawberryTeamAny(filters: $filters) {
            mutation
            node {
                coreID
            }
        }
    }
`;
