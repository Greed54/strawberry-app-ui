import {Created, Identity, Modified, SomeId} from "./types";

export enum EmployeeRole {
  PICKER,
  TEAM_LEAD,
  LOADER
}

export interface AddEmployeeCommand extends Created {
  identity: Identity;
  cardId: SomeId;
  firstName: string;
  lastName: string;
  employeeRole?: EmployeeRole;
  teamId: Identity;
  note: string;
}

export interface AmendEmployeeCommand extends Modified {
  identity: Identity;
  cardId: SomeId;
  firstName: string;
  lastName: string;
  teamId: Identity;
  note: string;
}

export interface AmendEmployeeRole extends Modified {
  identity: Identity;
  employeeRole: EmployeeRole;
}

export interface AmendEmployeeNote extends Modified {
  identity: Identity;
  note: string;
}
