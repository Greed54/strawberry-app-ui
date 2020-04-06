import gql from 'graphql-tag';

export const UPDATE_STRAWBERRY_EMPLOYEE_ANY = gql`
    subscription updateStrawberryEmployees($filters: EmployeesListFilter) {
        updateStrawberryEmployees(filters: $filters) {
            mutation
            node {
                coreID
            }
        }
    }
`;
