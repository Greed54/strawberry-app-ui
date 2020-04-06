import {StrawberryEmployee, StrawberryTeam} from "../../../../types/schema-types";

export interface EditEmployeeProps {
  isEdit: boolean;
  employee?: any;
  teams: Array<StrawberryTeam>;
  selectedTeam?: StrawberryTeam;
  onSave(employee: StrawberryEmployee): void;
}

export interface EditEmployeeState {
  employee: StrawberryEmployee;
}
