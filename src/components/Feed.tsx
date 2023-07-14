import React from 'react'
import NewPost from './NewPost'
import Post from './Post'

export default function Feed() {
    return (
        <div className='feed w-full min-h-screen flex flex-col py-4'>
            <div className='flex items-center justify-between w-1/2'>
                <h1 className='text-3xl px-6 mb-6'>Home</h1>
                <input className='bg-neutral-900 w-64 h-10 p-3 rounded-lg' placeholder='Search...'></input>
            </div>
            <NewPost />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}
