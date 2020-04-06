export const getEmployeesFilter = (data: any) => {
  const {
    teamId, fullName
  } = data;
  const removedWhere = {removed: false};
  const teamIdWhere = {team: {coreID: teamId}};
  const nameWhere = fullName.length ? {OR: [{firstName_in: fullName}, {lastName_in: fullName}]} : undefined;
  const filters = [
      removedWhere,
      teamIdWhere,
      nameWhere
  ].filter(f => f);
  return{ AND: filters };
};
