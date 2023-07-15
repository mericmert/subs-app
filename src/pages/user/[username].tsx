import Image from "next/image";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from "axios";
import { GetServerSideProps } from "next";
import UserError from "@/components/Error";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import ProfileModal from "@/components/ProfileModal";
import Post from "@/components/Post";
import NewPost from "@/components/NewPost";

type PageProps = {
    username: string;
    imageUrl: string;
    fullName: string;
}


export default function Profile({ data, session, profile_posts }: any) {

    const [open, setOpen] = useState<boolean>(false);
    const [userData, setData] = useState(data);

    let selfProfile: boolean = data?.username === session.user.username;

    useEffect(() => {
        setData(data);
    },[selfProfile])
    
    if (!data) {
        return <UserError />;
    }
    
    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const updateProfile = async () => {
        try {
            const profile = await axios.get(`/api/user/${userData.username}`);
            setData(profile.data);
        }
        catch (err) {
            console.log("Profile couldn't be updated!");
        }
    }

    return (
        <div className="w-full min-h-screen">
            {selfProfile && <ProfileModal
                open={open}
                closeModal={closeModal}
                userData={userData}
                updateProfile={updateProfile}
            />}
            <div className="profile-info min-h-64 w-3/4 m-auto py-4 flex flex-wrap gap-x-4 items-center pl-[3vw] border-neutral-900 border-b-2">
                <div className="user-info h-full flex flex-col justify-center items-center gap-y-4">
                    <div className="relative photo-container h-40 w-40 rounded-full">
                        <Image
                            className="rounded-full"
                            src={`/${userData.imageUrl ?? "default.webp"}`}
                            alt="profile-photo"
                            fill={true}
                            sizes="40 40"
                            priority
                        />
                    </div>
                    <div className="username-container text-neutral-300">
                        <span>@{userData.username}</span>
                    </div>
                    <div>
                        {userData.bio}
                    </div>
                </div>
                <div className="ml-12 name-followers-container self-start w-96 py-4 flex flex-col gap-y-4">
                    <h1 className="text-2xl">{userData.fullName}</h1>
                    <div className="stats flex flex-col">
                        <span>0 <span className="font-bold"> Followers</span></span>
                        <span>0 <span className="font-bold"> Following</span></span>
                        <span>{profile_posts.length} <span className="font-bold"> Post</span></span>
                    </div>
                    <div className="button-container flex gap-x-2">
                        {selfProfile ?
                            <>
                                <button onClick={openModal} className="w-32 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-sm">Edit Profile</button>
                            </>
                            :
                            <>
                                <button className="w-32 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-sm">Follow</button>
                                <button className="w-8 h-8 bg-neutral-100 text-black rounded-sm"><EmailOutlinedIcon /></button>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="w-3/4 m-auto">
                {profile_posts.map((post : any, idx : number) => <Post key={idx} postData={post}/>)}
            </div>
            
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
    const { username } = context.query;
    const session = await getSession(context);
    let userData: any = {};
    let profile_posts : any
    try {
        const profile = await axios.get(`${process.env.CANONICAL_URL}/api/user/${username}`);
        userData = profile.data;
        profile_posts = (await axios.get(`${process.env.CANONICAL_URL}/api/posts/${username}`)).data
    }
    catch (err) {
        console.log(err);
    }
    console.log(userData);
    return {
        props: JSON.parse(JSON.stringify({
            data: userData,
            session: session,
            profile_posts : profile_posts
        }))
    }
}
