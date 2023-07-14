import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import { getSession, useSession } from 'next-auth/react'
import Loading from '@/components/Loading'
import Feed from '@/components/Feed'
import { GetServerSideProps } from 'next'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })




export default function Home({userData, posts} : any) {

  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return <Feed userData={userData} posts={posts} />;
  }
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return <Login />;
  }

}


export const getServerSideProps: GetServerSideProps<any> = async (context) => {

  const session: any = await getSession(context);
  if (session) {
    let userData: any = {};
    let postList : any;
    try {
      const profile = await axios.get(`${process.env.CANONICAL_URL}/api/user/${session.user.username}`);
      const posts = await axios.get(`${process.env.CANONICAL_URL}/api/posts`);

      postList = posts.data;
      userData = profile.data;
    }
    catch (err) {
      console.log(err);
    }
    return {
      props : {
        posts : postList,
        userData
      }
    }
  }
  return {
    props : {}
  }

}
