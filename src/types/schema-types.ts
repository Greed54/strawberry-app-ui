export interface StrawberryEmployee {
  coreID: string;
  cardId: string;
  firstName: string;
  lastName: string;
  employeeRole: EmployeeRoles;
  note: string;
  team: StrawberryTeam;
  boxes?: StrawberryBox[];
  createdBy?: string;
  _createdAt?: any | null;
  removed?: boolean;
}

export enum EmployeeRoles {
  TEAM_LEAD = 'Team Lead',
  PICKER = 'Picker',
  LOADER = 'Loader',
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
  teams?: Array<StrawberryTeam>
  pricePerKilo: number;
  tareWeight: number;
  boxes?: number
  kilograms?: number
  allSalarys?: number
  createdBy?: string;
  _createdAt?: any | null;
  modifiedBy?: string;
  _modifiedAt?: any | null;
  removed?: boolean;
}

export interface StrawberryBox {
  coreID: string;
  employee?: StrawberryEmployee;
  workDay: StrawberryWorkDay;
  kilograms: number;
  boxAmount: number;
  weightId?: number;
  createdBy?: string;
  _createdAt?: any | null;
  modifiedBy?: string;
  _modifiedAt?: any | null;
  removed?: boolean;
}

export interface Sorting {
  key: string;
  order: 'ASC' | 'DESC';
}

export interface WorkDaysListFilter {
  dateFrom?: string | null;
  dateTo?: string | null;
  cardId?: string | null;
  name?: string | null;
  note?: string | null;
  teamName?: string | null;
}

export interface WorkDaysType {
  coreID: string;
  date: any;
  employeeCoreID: string;
  employeeName: string;
  teamName: string;
  cardId: string;
  weightNumbers: string;
  note: string;
  employeeRole: EmployeeRoles;
  pricePerKilo: number;
  tareWeight: number;
  boxes?: number
  kilograms?: number
  allSalarys?: number
}

export interface MultiSearchWorkDaysOptions {
  getSEmployeeOptions: (MultiSearchEmployeeOptions | null)[] | null;
}

export interface MultiSearchEmployeeOptions {
  cardId: string | null;
  firstName: string | null;
  lastName: string | null;
  note: string | null;
  team: MultiSearchTeamOptions | null;
}

export interface MultiSearchTeamOptions {
  teamName: string | null;
}
