"use client";

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

//getUserByName을 쓸지말지..?
const USER_INFO = gql`
  query getUserInfo($filter: UserFilter) {
    usersFilter(filter: $filter) {
      nickName
    }
  }
`;

// const MOD_USER_NICKNAME = gql``;

//추후에는 profileMessage..를 바꿉니다!
export default function Profile() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const name = "jabae";
  const { loading, error, data } = useQuery(USER_INFO, {
    variables: { filter: { name: name } },
    onCompleted: (data) => {
      console.log(data.usersFilter[0].nickName);
    },
  });
  //인증이 되어야... 요청을 보낼텐데...?
  return (
    <>
      <h2>profile</h2>
      <div>nickname : {data?.usersFilter[0].nickName} </div>
      <form>
        <input
          placeholder="modify nickname"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        ></input>
        <input type="button" value="submit" />
      </form>
      <div onClick={() => router.replace("/")}>메인으로가기</div>
    </>
  );
}
