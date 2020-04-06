
export const Query = {
  async getSTeams(parent: any, args: any, ctx: any, info: any) {
    return ctx.db.query.sTeams(args, info);
  },
  async getSEmployeesByTeamId(parent: any, {teamId}: {teamId: string}, ctx: any, info: any) {
    return await ctx.db.query.sEmployees({ where: { team: { coreID: teamId } } }, info);
  },
  async getSTeam(parent: any, {teamId}: {teamId: string}, ctx: any, info: any) {
    return await ctx.db.query.sTeam({ where: { coreID: teamId } }, info);
  },
  async getSEmployee(parent: any, {employeeId}: {employeeId: string}, ctx: any, info: any) {
    return await ctx.db.query.sEmployee({ where: { coreID: employeeId } }, info);
  }
};
