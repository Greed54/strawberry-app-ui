import gql from "graphql-tag";
import {client} from "../configs/apollo";
import {AddEmployeeCommand, AmendEmployeeCommand, AmendEmployeeRoleCommand} from "../../server/src/api/employee";

const ADD_STRAWBERRY_EMPLOYEE = gql`
    mutation createSEmployee($data: EmployeeCreateInput) {
        createSEmployee(data: $data)
    }
`;
const AMEND_STRAWBERRY_EMPLOYEE = gql`
    mutation updateSEmployee($data: EmployeeUpdateInput) {
        updateSEmployee(data: $data)
    }
`;

const AMEND_STRAWBERRY_EMPLOYEE_ROLE = gql`
    mutation updateSEmployeeRole($data: EmployeeUpdateRoleInput) {
        updateSEmployeeRole(data: $data)
    }
`;

export const addStrawberryEmployee = (data: AddEmployeeCommand) => client.mutate({mutation: ADD_STRAWBERRY_EMPLOYEE, variables: {data}});
export const amendStrawberryEmployee = (data: AmendEmployeeCommand) => client.mutate({mutation: AMEND_STRAWBERRY_EMPLOYEE, variables: {data}});
export const amendStrawberryEmployeeRole = (data: AmendEmployeeRoleCommand) => client.mutate({
  mutation: AMEND_STRAWBERRY_EMPLOYEE_ROLE,
  variables: {data}
});


