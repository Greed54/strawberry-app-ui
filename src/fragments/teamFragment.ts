import gql from 'graphql-tag';

const STRAWBERRY_TEAM_FRAGMENT = gql`
    fragment StrawberryTeamForList on STeam {
        coreID
        teamName
        teamLead {
            coreID
        }
        _createdAt
        createdBy
    }
`;

export {STRAWBERRY_TEAM_FRAGMENT};
