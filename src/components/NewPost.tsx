import React from 'react'

export default function NewPost() {
    return (
        <div className='new-post-container relative flex min-w-[480px] w-1/2 h-36 border-[.5px] border-l-0 border-neutral-700 pr-8'>
            <div className="photo-container p-3 w-[20%] h-full flex justify-center">
                <div className='w-16 h-16 rounded-full bg-neutral-900'>
                </div>
            </div>
            <div className='input-container w-[80%] h-24 border-b-[.5px] border-neutral-700 py-4'>
                <textarea
                    placeholder='How are you today ? :) '
                    className='h-full w-full bg-black outline-none border-0'
                />
            </div>
            <button className='absolute right-8 bottom-3 w-20 h-6 bg-gradient-to-r from-blue-500 text-sm to-indigo-500 rounded-md'>
                Post
            </button>
        </div>
    )
}
