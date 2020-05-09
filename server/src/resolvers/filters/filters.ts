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
  return {AND: filters};
};

export const getWorkDaysFilter = (data: any) => {
  const {
    dateFrom, dateTo, cardId, name, note, teamName
  } = data;
  const removedWhere = {removed: false};
  const dateWhere = {AND: [{date_gte: dateFrom}, {date_lte: dateTo}]};
  const cardIdWhere = cardId ? {teams_some: {employees_some: {cardId_in: cardId}}} : undefined;
  const nameWhere = name ? {teams_some: {employees_some: {OR: [{firstName_in: name}, {lastName_in: name}]}}} : undefined;
  const noteWhere = note ? {teams_some: {employees_some: {note_in: note}}} : undefined;
  const teamNameWhere = teamName ? {teams_some: {employees_some: {team: {teamName: teamName}}}} : undefined;
  const filters = [
    removedWhere,
    dateWhere,
    cardIdWhere,
    nameWhere,
    noteWhere,
    teamNameWhere
  ].filter(f => f);
  return {AND: filters};
};

export const employeeOptionsWhere = (searchValue: string) => ({
  AND: [
    {removed: false},
    {
      OR: [
        {cardId_contains: searchValue},
        {firstName_contains: searchValue},
        {lastName_contains: searchValue},
        {note_contains: searchValue},
        {team: {teamName_contains: searchValue}}
      ],
    },
  ],
});
