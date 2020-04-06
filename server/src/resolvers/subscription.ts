import {getEmployeesFilter} from "./filters/filters";

export const Subscription = {
  updateStrawberryTeamAny: {
    subscribe: (parent: any, { filters } : any, ctx: any, info: any) => {
      return ctx.db.subscription.sTeam({
        where: { node: {} }
      }, info);
    },
  },
  updateStrawberryEmployees: {
    subscribe: (parent: any, { filters } : any, ctx: any, info: any) => {
      return ctx.db.subscription.sEmployee({
        where: { node: getEmployeesFilter(filters) }
      }, info);
    }
  }
};
