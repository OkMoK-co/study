import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";

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
const addUserQuery = gql`
  mutation myMutation($name: String) {
    addUser(name: $name) {
      name
    }
  }
`;

export default function Component() {
  const name: String = "jiyo";
  const newUserName = { name: "jabae" };
  // const { loading, error, data } = useQuery(getUsersQuery);
  const { loading, error, data } = useQuery(getUserByName, {
    variables: { name },
  });
  // const [addUser, { loading, error, data }] = useMutation(addUserQuery);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {/* <div>get UserList {data?.users[1].name}</div> */}
      <div>getUserByName {data?.name}</div>
      {/* <div
        onClick={() => {
          addUser({ variables: { newUserName } });
        }}
      >
        addUser
      </div> */}
    </div>
  );
}
