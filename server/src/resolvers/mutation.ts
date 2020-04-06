import CommandRest from "../services/commandRest";
import {COMMANDS} from "../api/commands";
import {AddTeamCommand, AmendTeamCommand} from "../api/teams";
import {AddEmployeeCommand, AmendEmployeeCommand, AmendEmployeeNoteCommand, AmendEmployeeRoleCommand} from "../api/employee";

export const Mutation = {
  async createSTeam(parent: any, {data}: { data: AddTeamCommand }, {commandRest, meta}: { commandRest: CommandRest, meta: any }) {
    return commandRest.produce(COMMANDS.TEAM.create, data, meta);
  },
  async updateSTeam(parent: any, {data}: { data: AmendTeamCommand }, {commandRest, meta}: { commandRest: CommandRest, meta: any }) {
    return commandRest.produce(COMMANDS.TEAM.update, data, meta);
  },
  async createSEmployee(parent: any, {data}: { data: AddEmployeeCommand }, {commandRest, meta}: { commandRest: CommandRest, meta: any }) {
    return commandRest.produce(COMMANDS.EMPLOYEE.create, data, meta);
  },
  async updateSEmployee(parent: any, {data}: { data: AmendEmployeeCommand }, {commandRest, meta}: { commandRest: CommandRest, meta: any }) {
    return commandRest.produce(COMMANDS.EMPLOYEE.update, data, meta);
  },
  async updateSEmployeeRole(parent: any, {data}: { data: AmendEmployeeRoleCommand }, {commandRest, meta}: { commandRest: CommandRest, meta: any }) {
    return commandRest.produce(COMMANDS.EMPLOYEE.updateRole, data, meta);
  },
  // async updateSEmployeeNote(parent: any, {data}: { data: AmendEmployeeNote }, {commandRest, meta}: { commandRest: CommandRest, meta: any }) {
  //   const payload = JSON.stringify(data);
  //   return commandRest.produce(COMMANDS.EMPLOYEE.updateNote, payload, meta);
  // }
};
