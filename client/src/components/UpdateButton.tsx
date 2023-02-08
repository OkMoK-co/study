import { gql, useMutation } from "@apollo/client";

const modifyUserNameQuery = gql`
  mutation myMutation($name: String, $nickName: String) {
    modifyNickname(name: $name, nickName: $nickName) {
      name
      nickName
    }
  }
`;

export default function UpdateButton() {
  const [modifyNickname, { loading, error, data }] = useMutation(
    modifyUserNameQuery,
    {
      onCompleted: (data) => {
        console.log("complete ", data);
      },
    }
  );
  return (
    <div>
      <button
        onClick={() => {
          modifyNickname({
            variables: { name: "jiyo", nickName: "hi" },
          });
        }}
      >
        Update Nickname
      </button>
    </div>
  );
}
