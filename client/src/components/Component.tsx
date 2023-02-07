import { gql, useQuery } from '@apollo/client';

const getUsersQuery = gql`
  query Users {
    users {
      name
      nickName
    }
  }
`;

export default function Component() {
  const { loading, error, data } = useQuery(getUsersQuery);
  // console.log('component', data);
  return (
    <div>
      hi
      {data?.users?.map((e: any, idx: number) => {
        return <div key={idx}>{e.name}</div>;
      })}
    </div>
  );
}
