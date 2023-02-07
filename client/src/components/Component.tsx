import { gql, useQuery } from "@apollo/client";

const getUsersQuery = gql`
  query Users {
    users {
      name
    }
  }
`;
const getUserByName = gql`
  query myQuery($name: String) {
    getUserByName(name: $name) {
      name
    }
  }
`;

export default function Component() {
  const name = "jiyo";
  const { loading, error, data } = useQuery(getUsersQuery);
  const userByName = useQuery(getUserByName, { variables: { name } });
  console.log(userByName);
  return (
    <div>
      <div>get UserList {data?.users[1].name}</div>
      <div>getUserByName {userByName.data?.name}</div>
    </div>
  );
}
