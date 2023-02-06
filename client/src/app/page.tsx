"use client";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

// 새로운 apollo client 만들기
const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const getUser = async () => {
    // apollo에 연결된 graphql쿼리문 사용하고, 데이터 불러오기
    const { data } = await client.query({
      query: gql`
        query Users {
          users {
            name
          }
        }
      `,
    });
    console.log(data);
  };
  return (
    <>
      <div onClick={getUser}>메인입니다.</div>
      <Link href="/profile">프로필로 가기</Link>
    </>
  );
}
