"use client";

import Link from "next/link";
import { Inter } from "@next/font/google";
import Component from "@/components/Component";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>메인입니다.</div>
      <Link href="/profile">프로필로 가기</Link>
      <Component />
    </>
  );
}
