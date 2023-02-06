import Image from 'next/image'
import Link from 'next/Link'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
		<>
    <div>메인입니다.</div>
		<Link href="/profile">프로필로 가기</Link>
		</>
  )
}
