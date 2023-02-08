import { gql, useMutation } from "@apollo/client";
const addUserQuery = gql`
  mutation myMutation($name: String) {
    addUser(name: $name) {
      name
      nickName
    }
  }
`;
export default function CreateButton() {
  const newUserName = "jabae";
  const [addUser, { loading, error, data }] = useMutation(addUserQuery, {
    onCompleted: (data) => {
      console.log("in useMutation", data);
    },
  });
  return (
    <button
      onClick={() => {
        addUser({ variables: { name: newUserName } });
      }}
    >
      create User
    </button>
  );
}
