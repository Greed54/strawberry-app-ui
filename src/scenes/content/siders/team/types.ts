import {StrawberryTeam} from "../../../../types/schema-types";

export interface TeamSiderProps {
  isEdit: boolean;
  sTeam?: StrawberryTeam;
  onTeamSave(team: StrawberryTeam): void;
}

export interface TeamSiderState {
  team: StrawberryTeam;
}

