import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import CreateButton from "./CreateButton";
import UpdateButton from "./UpdateButton";

const USERS_QUERY = gql`
  query Users {
    users {
      name
      nickName
    }
  }
`;

const USERS_NAME_FILTER = gql`
  query Users($filter: UserFilter) {
    usersFilter(filter: $filter) {
      name
      age
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
  const name: String = "jiyo";
  const newUserName = "jabae";
  // const { loading, error, data } = useQuery(USERS_QUERY, {
  //   onCompleted: (data) => {
  //     console.log(data);
  //   },
  // });
  const { loading, error, data } = useQuery(USERS_NAME_FILTER, {
    variables: { filter: { name: name } },
    onCompleted: (data) => {
      console.log(data);
    },
  });
  // const { loading, error, data } = useQuery(getUserByName, {
  //   variables: { name },
  // });
  const userList = data?.users?.map((e: any, i: number) => (
    <div key={i}>{`Name: ${e.name} nickName : ${e.nickName}`}</div>
  ));
  return (
    <div>
      {/* <div>getUserByName {data?.getUserByName.name}</div> */}
      <UpdateButton />
      <CreateButton />
      <div>{userList}</div>
    </div>
  );
}
