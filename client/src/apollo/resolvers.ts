import { addUser, findUser, modifyNickname } from "config/db";

interface argType {
  [key: string]: any; //any...ใ ใ 
}

const users = [
  {
    name: "jabae",
    nickName: "๐๐๐ณ๏ธ๐ข",
    age: 22,
  },
  {
    name: "jiyo",
    nickName: "๐ผ๐ป",
    age: 22,
  },
  {
    name: "donghyuk",
    nickName: "๐",
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
    //์ฒซ๋ฒ์งธ ์ธ์๋ก ์ด์  ๋ฆฌ์กธ๋ฒ๋ก๋ถํฐ ๋ฐ์ ๋ฐ์ดํฐ ์์น, ๋ ๋ฒ์งธ ์ธ์๋ก args๊ฐ ์ด
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
