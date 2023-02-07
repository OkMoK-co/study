const users = [
  {
    name: 'jabae',
    nickName: '📏🍐🛳️🚢',
  },
  {
    name: 'jiyo',
    nickName: '👼🏻',
  },
  {
    name: 'donghyuk',
    nickName: '🔐',
  },
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

export default resolvers;
