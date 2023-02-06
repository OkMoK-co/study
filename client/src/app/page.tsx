import Link from 'next/link';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  (async () => {
    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'applocation/json',
      },
      body: JSON.stringify({ query: '{ users { name } }' }),
    });
    // const json = await response.json();// json 형태 변경 처리 필요
    console.log('우린 할 수 있다', response);
  })();

  return (
    <>
      <div>메인입니다.</div>
      <Link href='/profile'>프로필로 가기</Link>
    </>
  );
}
