import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';

const getUsersQuery = gql`
  query Users {
    users {
      name
      nickName
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
      nickName
    }
  }
`;
const modifyUserNameQuery = gql`
  mutation myMutation($name: String, $nickName: String) {
    modifyNickname(name: $name, nickName: $nickName) {
      name
      nickName
    }
  }
`;

export default function Component() {
  const name: String = 'jiyo';
  const newUserName = 'jiyokim';
  // const { loading, error, data } = useQuery(getUsersQuery);
  // const { loading, error, data } = useQuery(getUserByName, {
  //   variables: { name },
  // });
  // const [addUser, { loading, error, data }] = useMutation(addUserQuery, {
  //   errorPolicy: "all",
  //   onCompleted: (data) => {
  //     console.log("in useMutation", data);
  //   },
  // });
  const [modifyNickname, { loading, error, data }] = useMutation(
    modifyUserNameQuery,
    {
      onCompleted: (data) => {
        console.log('complete ', data);
      },
    }
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      {/* <div>get UserList {data?.users[1].name}</div> */}
      {/* <div>getUserByName {data?.getUserByName.name}</div> */}
      {/* <div
        onClick={() => {
          addUser({ variables: { name: newUserName } });
        }}
      >
        addUser
      </div> */}
      <div
        onClick={() => {
          modifyNickname({
            variables: { name: newUserName, nickName: 'hoohoo' },
          });
        }}
      >
        modify success?
      </div>
    </div>
  );
}
