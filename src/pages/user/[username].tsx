import Image from "next/image";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from "axios";
import { GetServerSideProps } from "next";
import UserError from "@/components/Error";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import ProfileModal from "@/components/ProfileModal";
import Post from "@/components/Post/Post";
import NewPost from "@/components/Post/NewPost";
import { Profile, Post as PostDTO } from "user-types";
import { Session } from "next-auth";

type ProfileProps = {
    profile_data?: Profile;
    session?: Session;
    profile_posts?: PostDTO[];
}

type ProfileNotFoundProps = {
    noProfileFound : boolean;
}


export default function Profile({profile_data, session, profile_posts, noProfileFound} : ProfileProps & ProfileNotFoundProps) {
    
    const [open, setOpen] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<Profile | undefined>(profile_data);
    const [selfProfile] = useState<boolean>(profileData?.username === session?.user?.username);
    useEffect(() => {
        setProfileData(profileData);
    }, [selfProfile, profileData])

    if (noProfileFound) {
        return <NoProfilePage/> 
    }
    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const updateProfile = async () => {
        try {
            const res = await axios.get(`/api/user/${profileData?.username}`);
            setProfileData(res.data);
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
                userData={profileData}
                updateProfile={updateProfile}
            />}
            <div className="profile-info min-h-64 w-3/4 m-auto py-4 flex flex-wrap gap-x-4 items-center pl-[3vw] border-neutral-900 border-b-2">
                <div className="user-info h-full flex flex-col justify-center items-center gap-y-4">
                    <div className="relative photo-container h-40 w-40 rounded-full">
                        <Image
                            className="rounded-full"
                            src={`/${profileData?.profile.imageUrl ?? "default.webp"}`}
                            alt="profile-photo"
                            fill={true}
                            sizes="40 40"
                            priority
                        />
                    </div>
                    <div className="username-container text-neutral-300">
                        <span>@{profileData?.username}</span>
                    </div>
                    <div>
                        {profileData?.profile.bio}
                    </div>
                </div>
                <div className="ml-12 name-followers-container self-start w-96 py-4 flex flex-col gap-y-4">
                    <h1 className="text-2xl">{profileData?.profile.fullName}</h1>
                    <div className="stats flex flex-col">
                        <span>0 <span className="font-bold"> Followers</span></span>
                        <span>0 <span className="font-bold"> Following</span></span>
                        <span>{profile_posts?.length} <span className="font-bold"> Post</span></span>
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
                {profile_posts?.map((post: any, idx: number) => <Post key={idx} postData={post} />)}
            </div>

        </div>
    )
}

const NoProfilePage = () => {
    return (
        <>
            <UserError />;
        </>
    )
}




export const getServerSideProps: GetServerSideProps<ProfileProps & ProfileNotFoundProps> = async (context) => {
    const { username } = context.query;
    const session: Session | null = await getSession(context);
    if (session) {
        try {
            const profile_data: Profile = (await axios.get(`${process.env.CANONICAL_URL}/api/user/${username}`)).data;
            const posts_data: PostDTO[] = (await axios.get(`${process.env.CANONICAL_URL}/api/posts/${username}`)).data;
            return {
                props: JSON.parse(JSON.stringify({
                    profile_data: profile_data,
                    session: session,
                    profile_posts: posts_data,
                    noProfileFound : false
                }))
            }
        }
        catch (err) {
            
        }
    }
    return {
        props: {
            noProfileFound : true
        }
    }
}
