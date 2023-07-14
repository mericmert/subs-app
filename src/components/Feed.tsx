import React, { useEffect, useState } from 'react'
import NewPost from './NewPost'
import Post from './Post'
import { GetServerSideProps } from 'next'
import axios from 'axios'

export default function Feed({session, userData, posts} : any) {

    const [postList, setPostList] = useState(posts);

    const updatePosts = async () => {
        try{
            const new_posts = await axios.get(`/api/posts`);
            setPostList(new_posts.data);
        }
        catch(err){
            console.log(err);
        }

    }

    return (
        <div className='feed w-2/3 min-h-screen flex flex-col py-4'>
            <div className='flex items-center justify-between w-full'>
                <h1 className='text-3xl px-6 mb-6'>Home</h1>
                <input className='bg-neutral-900 w-64 h-10 p-3 rounded-lg outline-none' placeholder='Search...'></input>
            </div>
            <NewPost userData={userData} updatePosts={updatePosts} />
            {postList.map((post : any, idx : number) => <Post key={idx} postData={post}/>)}
        </div>
    )
}


