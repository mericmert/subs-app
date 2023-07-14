import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import { getSession, useSession } from 'next-auth/react'
import Loading from '@/components/Loading'
import Feed from '@/components/Feed'
const inter = Inter({ subsets: ['latin'] })




export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  if (status === "authenticated") {
    return <Feed/>;
  }
  if (status === "loading") {
    return <Loading/>;
  }
  if (status === "unauthenticated") {
    return <Login />;
  }

}
