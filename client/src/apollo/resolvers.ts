const users = [
  {
    name: "jabae",
    nickName: "📏🍐🛳️🚢",
  },
  {
    name: "jiyo",
    nickName: "👼🏻",
  },
  {
    name: "donghyuk",
    nickName: "🔐",
  },
];

const resolvers = {
  Query: {
    users: () => users,
    getUserByName: (_: any, name: { [key: string]: string }) => {
      return users.filter((e) => e.name === name.name)[0];
    },
  },
  Mutation: {
    //첫번째 인자로 이전 리졸버로부터 받은 데이처 위치, 두 번째 인자로 args가 옴
    addUser: (_: any, name: { [key: string]: string }) => {
      console.log("addUserMutation: ", name.name);
      users.push({ name: name.name, nickName: "jabae" });
      return users;
    },
    modifyNickname: (_: any, { name, nickName }: { [key: string]: string }) => {
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
