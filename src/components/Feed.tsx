import React, { useCallback, useEffect, useState } from 'react'
import NewPost from './Post/NewPost'
import Post from './Post/Post'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Post as PostDTO, Profile } from 'user-types'

export default function Feed() {

    const { data: session } = useSession();
    const [profileData, setProfileData] = useState<Profile>();
    const [posts, setPosts] = useState<PostDTO[]>([]);
    
    const updateUserInfo = useCallback(async () => {
        try {
            const res = await axios.get(`/api/user/${session?.user?.username}`)
            setProfileData(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }, [session]);

    const updatePosts = async () => {
        try {
            const res = await axios.get(`/api/posts`);
            setPosts(res.data);
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        updateUserInfo();
        updatePosts();
    }, [updateUserInfo])


    return (
        <div className='feed w-2/3 min-h-screen flex flex-col py-4'>
            <div className='flex items-center justify-between w-full'>
                <h1 className='text-3xl px-6 mb-6'>Home</h1>
                <input className='bg-neutral-900 w-64 h-10 p-3 rounded-lg outline-none' placeholder='Search...'></input>
            </div>
            <NewPost profileData={profileData} updatePosts={updatePosts} />
            {posts?.map((post: any, idx: number) => <Post key={idx} postData={post} />)}
        </div>
    )
}


