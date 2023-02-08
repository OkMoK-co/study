import { addUser, findUser, modifyNickname } from "config/db";

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
      if (!args.filter.name && !args.filter.age) return users;
      return users.filter((e) => e.name === args.filter.name);
    },
    getUserByName: (_: any, name: argType) => {
      //findUser(name.name);
      return users.filter((e) => e.name === name.name)[0];
    },
  },
  Mutation: {
    //첫번째 인자로 이전 리졸버로부터 받은 데이터 위치, 두 번째 인자로 args가 옴
    addUser: (_: any, name: argType) => {
      console.log("addUserMutation: ", name.name);
      users.push({ name: name.name, nickName: "jabae", age: 0 });
      // addUser({ name: name.name, nickName: "test" });
      return users;
    },
    modifyNickname: (_: any, { name, nickName }: argType) => {
      console.log("modifyName", name);
      users.forEach((e) => {
        if (e.name === name) {
          e.nickName = nickName;
        }
      });
      // modifyNickname({ name: "jiyokim", nickName: "modify" });
      return { name: name, nickName: nickName };
    },
  },
};

export default resolvers;
