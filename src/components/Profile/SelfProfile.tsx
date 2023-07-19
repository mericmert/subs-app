import axios from 'axios';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Profile as ProfileDTO, Post as PostDTO } from 'user-types'
import ProfileModal from '../ProfileModal';
import Post from '../Post/Post';

type ProfileProps = {
    profile_data?: ProfileDTO;
    session?: Session;
    profile_posts?: PostDTO[];
}

export default function SelfProfile({ profile_data, session, profile_posts }: ProfileProps) {

    const [open, setOpen] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<ProfileDTO | undefined>(profile_data);
    useEffect(() => {
        setProfileData(profileData);
    }, [profileData])
    console.log(profileData);


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
            <ProfileModal
                open={open}
                closeModal={closeModal}
                userData={profileData}
                updateProfile={updateProfile}
            />
            <div className="profile-info min-h-64 w-3/4 m-auto py-4 flex flex-wrap gap-x-4 items-center pl-[3vw] border-neutral-900 border-b-2">
                <div className="user-info h-full flex flex-col justify-center items-center gap-y-4">
                    <div className="relative photo-container h-40 w-40 rounded-full">
                        <Image
                            className="rounded-full"
                            src={profileData?.profile.imageUrl ? `/images/${profileData?.profile.imageUrl}` : "/default.webp"}
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
                        <button onClick={openModal} className="w-32 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-sm">Edit Profile</button>
                    </div>
                </div>
            </div>
            <div className="w-3/4 m-auto">
                {profile_posts?.map((post: any, idx: number) => <Post key={idx} postData={post} />)}
            </div>

        </div>
    )
}
