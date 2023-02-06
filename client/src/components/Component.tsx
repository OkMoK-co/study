import { gql, useQuery } from "@apollo/client";

const getUsersQuery = gql`
  query Users {
    users {
      name
    }
  }
`;

export default function Component() {
  const { loading, error, data } = useQuery(getUsersQuery);
  console.log(data);
  return <div>hi {data?.users[0].name}</div>;
}
