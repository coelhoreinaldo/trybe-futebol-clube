const matches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Avaí/Kindermann',
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann',
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Bahia',
    },
    awayTeam: {
      teamName: 'Bahia',
    },
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Botafogo',
    },
    awayTeam: {
      teamName: 'Botafogo',
    },
  },
  {
    id: 4,
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians',
    },
    awayTeam: {
      teamName: 'Corinthians',
    },
  },
  {
    id: 5,
    homeTeamId: 7,
    homeTeamGoals: 1,
    awayTeamId: 10,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Cruzeiro',
    },
    awayTeam: {
      teamName: 'Cruzeiro',
    },
  },
  {
    id: 6,
    homeTeamId: 5,
    homeTeamGoals: 1,
    awayTeamId: 13,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Ferroviária',
    },
    awayTeam: {
      teamName: 'Ferroviária',
    },
  },
  {
    id: 7,
    homeTeamId: 12,
    homeTeamGoals: 2,
    awayTeamId: 6,
    awayTeamGoals: 2,
    inProgress: false,
    homeTeam: {
      teamName: 'Flamengo',
    },
    awayTeam: {
      teamName: 'Flamengo',
    },
  },
  {
    id: 8,
    homeTeamId: 15,
    homeTeamGoals: 0,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Grêmio',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 9,
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 12,
    awayTeamGoals: 3,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
  {
    id: 10,
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 9,
    awayTeamGoals: 2,
    inProgress: false,
    homeTeam: {
      teamName: 'Minas Brasília',
    },
    awayTeam: {
      teamName: 'Minas Brasília',
    },
  },
];

const matchesInProgress = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Ferroviária',
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann',
    },
  },
];

const finishedMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional',
    },
    awayTeam: {
      teamName: 'Santos',
    },
  },
];

export default { matches, matchesInProgress, finishedMatches };
