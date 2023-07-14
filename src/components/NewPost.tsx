import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRef, useState } from 'react';

export default function NewPost({ userData, updatePosts }: any) {

    const [textContent, setTextContent] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createPost = async () => {
        setIsLoading(true);
        try {
            await axios.post("/api/posts/create", {
                username: userData.username,
                text_content: textContent,
            })
            
            await updatePosts();
            setTextContent("");
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);

        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTextContent(event.target.value);
    }

    return (
        <div className='new-post-container relative flex min-w-[480px] w-full h-36 border-[.5px] border-l-0 border-neutral-700 pr-8'>
            <div className="photo-container py-3 w-[20%] h-full flex justify-center">
                <div className='relative w-16 h-16 rounded-full bg-neutral-900'>
                    <Image
                        className='rounded-full'
                        src={`/${userData.imageUrl ?? "default.webp"}`}
                        alt="profile-avatar"
                        fill={true}
                    />
                </div>
            </div>
            <div className='input-container w-[80%] h-24 border-b-[.5px] border-neutral-700 py-4'>
                <textarea
                    onChange={(e) => handleChange(e)}
                    value={textContent}
                    placeholder='How are you today ? :) '
                    className='h-full w-full bg-black outline-none border-0'
                />
            </div>
            <button onClick={createPost} className='absolute right-8 bottom-3 w-20 h-6 bg-gradient-to-r from-blue-500 text-sm to-indigo-500 rounded-md'>
                {isLoading ? "..." : "Post"}
            </button>
        </div>
    )
}
