"use client";
import Link from "next/link";
import { Inter } from "@next/font/google";

import { client } from "@/apollo-client";
import { ApolloProvider } from "@apollo/client";
import Component from "@/components/Component";

const inter = Inter({ subsets: ["latin"] });
// ApolloProvider를 최상위 레이아웃에 위치시키고 싶었지만 에러가 나서 우선은 페이지에 넣었습니다.
// src/apollo-client.ts 에 아폴로클라이언트 객체를 만들고 임포트 했습니다.
// 임의의 컴포넌트를 src/components/Component.tsx에 만들고 유저 이름을 useQuery를 이용해 가져왔고
// 그 컴포넌트를 이 page에 위치시켰습니다! 그 결과 hi Nextjs 가 잘 렌더링 되네요!
export default function Home() {
  // const getUser = async () => {
  //   const { data } = await client.query({
  //     query: Query,
  //   });
  //   console.log(data);
  //   return data;
  // };
  return (
    <>
      <ApolloProvider client={client}>
        <div>메인입니다.</div>
        <Link href="/profile">프로필로 가기</Link>
        <Component />
      </ApolloProvider>
    </>
  );
}
