interface argType {
  [key: string]: any; //any...ㅠㅠ
}

const users = [
  {
    name: "jabae",
    nickName: "📏🍐🛳️🚢",
    age: 22,
  },
  {
    name: "jiyo",
    nickName: "👼🏻",
    age: 22,
  },
  {
    name: "donghyuk",
    nickName: "🔐",
    age: 23,
  },
];

const resolvers = {
  Query: {
    users: () => users,
    usersFilter: (_: any, args: any) => {
      console.log(args.filter.name);
      return users.filter((e) => e.name === args.filter.name);
    },
    getUserByName: (_: any, name: argType) => {
      return users.filter((e) => e.name === name.name)[0];
    },
  },
  Mutation: {
    //첫번째 인자로 이전 리졸버로부터 받은 데이터 위치, 두 번째 인자로 args가 옴
    addUser: (_: any, name: argType) => {
      console.log("addUserMutation: ", name.name);
      users.push({ name: name.name, nickName: "jabae", age: 0 });
      return users;
    },
    modifyNickname: (_: any, { name, nickName }: argType) => {
      console.log("modifyName", name);
      users.forEach((e) => {
        if (e.name === name) {
          e.nickName = nickName;
        }
      });
      return { name: name, nickName: nickName };
    },
  },
};

export default resolvers;
