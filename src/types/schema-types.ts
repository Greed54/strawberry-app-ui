export interface StrawberryEmployee {
  coreID: string;
  cardId: string;
  firstName: string;
  lastName: string;
  employeeRole: EmployeeRoles;
  note: string;
  team: StrawberryTeam;
  createdBy?: string;
  _createdAt?: any | null;
  removed?: boolean;
}

export enum EmployeeRoles {
  UNASSIGNED = 'Unassigned',
  TEAM_LEAD = 'Team Lead',
  PICKER = 'Picker',
  LOADER = 'Loader'
}

export interface StrawberryEmployeeExtended extends StrawberryEmployee {
  selected: boolean;
  fullName: string;
  boxesForAllTime: number;
  salaryForAllTime: number;
  _isRowClickable: boolean;
}

export interface StrawberryTeam {
  coreID: string;
  teamName: string;
  teamLead?: StrawberryEmployee;
  employees?: Array<StrawberryEmployee>;
  createdBy?: string;
  _createdAt?: any | null;
  modifiedBy?: string;
  _modifiedAt?: any | null;
  removed?: boolean;
}

export interface StrawberryWorkDay {
  coreID: string;
  date: any;
  teams: Array<StrawberryTeam>
  pricePerKilo: number;
  tareWeight: number;
  createdBy: string;
  _createdAt: any | null;
  modifiedBy: string;
  _modifiedAt: any | null;
  removed: boolean;
}

export interface StrawberryBox {
  coreID: string;
  employee: StrawberryEmployee;
  workDay: StrawberryWorkDay;
  kilograms: number;
  boxes: number;
  weightNumber: number;
  createdBy: string;
  _createdAt: any | null;
  modifiedBy: string;
  _modifiedAt: any | null;
  removed: boolean;
}

export interface Sorting {
  key: string;
  order: 'ASC' | 'DESC';
}
