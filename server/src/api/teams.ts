import {Created, Identity, Modified} from "./types";

export interface AddTeamCommand extends Created {
  identity: Identity;
  teamName: string;
  teamLeadId?: Identity;

}

export interface AmendTeamCommand extends Modified {
  identity: Identity;
  teamName: string;
  teamLeadId?: Identity;

}
