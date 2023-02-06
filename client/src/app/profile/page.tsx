"use client";

import { useRouter } from 'next/navigation';

export default function Profile() {
	const router = useRouter();
	console.log(router);
	return <><div>profile 입니다.</div><div onClick={() => router.replace("/")}>메인으로가기</div></>
}