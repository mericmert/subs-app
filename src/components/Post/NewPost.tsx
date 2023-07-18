import axios from 'axios';
import Image from 'next/image'
import { useState } from 'react';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { toast } from 'react-toastify';
import { Profile } from 'user-types';

export default function NewPost({ profileData, updatePosts }: { profileData: Profile | undefined, updatePosts: () => Promise<void> }) {

    const [textContent, setTextContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File>();


    const handleUpload = async () => {
        const validFormats: string[] = [".jpg", ".png", ".jpeg", ".webp"]
        let isValid: boolean = false;
        for (const format of validFormats) {
            if (selectedImage.endsWith(format)) isValid = true;
        }
        if (selectedFile && !isValid) throw Error("Wrong file format!");

        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("myImage", selectedFile);
            const { data } = await axios.post("/api/image", formData);
            return data;
        } catch (error: any) {
            console.log(error);
        }
        return;
    };



    const createPost = async () => {
        setIsLoading(true);
        try {
            let image_data = await handleUpload();
            await axios.post("/api/posts/create", {
                username: profileData?.username,
                text_content: textContent,
                imageUrl: (image_data?.file_path)
            })

            await updatePosts();
            setTextContent("");
            setSelectedImage("");
            setSelectedFile(undefined);
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong!")
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
                        src={`/${profileData?.profile.imageUrl ?? "default.webp"}`}
                        alt="profile-avatar"
                        fill={true}
                        sizes='16 16'
                    />
                </div>
            </div>
            <div className='relative input-container w-[80%] h-24 border-b-[.5px] border-neutral-700 py-4'>
                <textarea
                    onChange={(e) => handleChange(e)}
                    value={textContent}
                    placeholder='How are you today ? :) '
                    className='h-full w-full bg-black outline-none border-0'
                />

                <label className='left-0 -bottom-8'>
                    <input type='file' hidden onChange={({ target }) => {
                        if (target.files) {
                            const file = target.files[0];
                            setSelectedImage(file.name);
                            setSelectedFile(file);
                        }
                    }} />
                    <span className='absolute left-0 -bottom-8 cursor-pointer'>
                        <InsertPhotoOutlinedIcon />
                        <span>{selectedImage}</span>
                    </span>
                </label>

            </div>
            <button onClick={createPost} className='absolute right-8 bottom-3 w-20 h-7 bg-gradient-to-r from-blue-500 text-sm to-indigo-500 rounded-md'>
                {isLoading ? "..." : "Post"}
            </button>
        </div>
    )
}
