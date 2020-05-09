import gql from 'graphql-tag';

const STRAWBERRY_WORK_DAY_FRAGMENT = gql`
    fragment StrawberryWorkDayForList on SWorkDay {
        coreID
        date
        pricePerKilo
        tareWeight
        teams {
            coreID
            employees(where: { removed: false }) {
                coreID
                cardId
                firstName
                lastName
                employeeRole
                note
                team {
                    teamName
                }
                boxes(where: { removed: false }) {
                    coreID
                    workDay {
                        coreID
                    }
                    kilograms
                    boxAmount
                    weightId
                }
            }
        }
    }
`;

export {STRAWBERRY_WORK_DAY_FRAGMENT};
