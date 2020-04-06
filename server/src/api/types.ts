export interface Identity {
  value: string;
}

export interface SomeId {
  key: string;
}

export interface Modified {
  modifiedAt: string;
  modifiedBy: SomeId;
}

export interface Created {
  createdAt: string;
  createdBy: SomeId;
}
