const matches = [
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
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians',
    },
    awayTeam: {
      teamName: 'Napoli-SC',
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
      teamName: 'Botafogo',
    },
    awayTeam: {
      teamName: 'Bahia',
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
      teamName: 'Flamengo',
    },
    awayTeam: {
      teamName: 'Minas Brasília',
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
      teamName: 'Cruzeiro',
    },
    awayTeam: {
      teamName: 'Real Brasília',
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
      teamName: 'Palmeiras',
    },
    awayTeam: {
      teamName: 'Ferroviária',
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
      teamName: 'São José-SP',
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann',
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
      teamName: 'Avaí/Kindermann',
    },
    awayTeam: {
      teamName: 'Palmeiras',
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
      teamName: 'Bahia',
    },
    awayTeam: {
      teamName: 'Internacional',
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

const updateMatchValidBody = {
  homeTeamGoals: 4,
  awayTeamGoals: 39,
};

const updatedMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: updateMatchValidBody.homeTeamGoals,
  awayTeamId: 8,
  awayTeamGoals: updateMatchValidBody.awayTeamGoals,
  inProgress: false,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Grêmio',
  },
};

const createdMatch = {
  id: 1,
  homeTeamId: 12,
  homeTeamGoals: 3,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
};

const createMatchBody = {
  homeTeamId: 12,
  awayTeamId: 8,
  homeTeamGoals: 3,
  awayTeamGoals: 2,
};

const foundTeam1 = {
  id: 12,
  teamName: 'Palmeiras',
};

const foundTeam2 = {
  id: 8,
  teamName: 'Palmeiras',
};

const createMatchWithTheSameTeams = {
  homeTeamId: 12,
  awayTeamId: 12,
  homeTeamGoals: 3,
  awayTeamGoals: 2,
}

const createMatchWithInexistentTeam = {
  homeTeamId: 12,
  awayTeamId: 99,
  homeTeamGoals: 3,
  awayTeamGoals: 2,
}

export default {
  matches,
  matchesInProgress,
  finishedMatches,
  updateMatchValidBody,
  updatedMatch,
  createdMatch,
  createMatchBody,
  foundTeam1,
  foundTeam2,
  createMatchWithTheSameTeams,
  createMatchWithInexistentTeam
};
