import gql from 'graphql-tag';

const STRAWBERRY_EMPLOYEE_FRAGMENT = gql`
    fragment StrawberryEmployeeForList on SEmployee {
        coreID
        cardId
        firstName
        lastName
        employeeRole
        note
        team {
            coreID
        }
        boxes {
            coreID
            boxAmount
            kilograms
            workDay {
                coreID
                date
                pricePerKilo
                tareWeight
            }
        }
    }
`;

export {STRAWBERRY_EMPLOYEE_FRAGMENT};
