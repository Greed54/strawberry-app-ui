import {all, call, put, select} from "redux-saga/effects";
import {getStrawberryTeams} from "../../../queries/team";
import {Action} from "typescript-fsa";
import {StrawberryTeam} from "../../../types/schema-types";
import {recordKey, recordValue} from "../../../helpers/data";
import moment from "moment";
import {addStrawberryTeam, amendStrawberryTeam} from "../../../mutation/team";
import {safeTakeEvery} from "../../../helpers/saga";
import {actions} from "./duck";
import {AddTeamCommand, AmendTeamCommand} from "../../../../server/src/api/teams";
import {getTeamsSelector} from "./selectors";

function* fetch() {
  yield put(actions.setTeamsLoading(true));
  const [teamList] = yield all([
    call(getStrawberryTeams),
  ]);
  const {data: {getSTeams}} = teamList;
  yield put(actions.fetchSuccess(getSTeams));
  yield put(actions.setTeamsLoading(false));
}

const userId = "6ded5d05-8996-4146-97f6-2f83984b20f6";

function* saveStrawberryTeam(action: Action<StrawberryTeam>) {
  const {coreID, teamName} = action.payload;
  const teams = yield select(getTeamsSelector);
  const updatedTeam = teams.filter((team: StrawberryTeam) => team.coreID === coreID);
  const addTeamCommand: AddTeamCommand = {
    identity: recordValue(coreID),
    teamName: teamName,
    createdAt: moment.utc().format(),
    createdBy: recordKey(userId),
  };
  const amendTeamCommand: AmendTeamCommand = {
    identity: recordValue(coreID),
    teamName: teamName,
    modifiedAt: moment.utc().format(),
    modifiedBy: recordKey(userId),
  };

  yield updatedTeam ? call(amendStrawberryTeam, amendTeamCommand) : call(addStrawberryTeam, addTeamCommand);
}

function* createOrUpdateTeamSaga({payload}: any) {
  const teamsList = yield select(getTeamsSelector);
  const team = teamsList.find((t: StrawberryTeam) => t.coreID === payload.coreID);
  if (team) {
    const updatedTeamsList = teamsList.map((team: StrawberryTeam) => {
      if (team.coreID === payload.coreID) {
        return payload;
      }
      return team;
    });
    yield put(actions.createOrUpdateTeamSuccess(updatedTeamsList));
  } else {
    const updatedTeamsList = [...teamsList, payload];
    yield put(actions.createOrUpdateTeamSuccess(updatedTeamsList));
  }
}

export function* saga() {
  yield safeTakeEvery(actions.fetch.type, fetch);
  yield safeTakeEvery(actions.saveSider.type, saveStrawberryTeam);
  yield safeTakeEvery(actions.createOrUpdateTeamSubscription.type, createOrUpdateTeamSaga);
}
