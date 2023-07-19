import axios from "axios";
import { GetServerSideProps } from "next";
import UserError from "@/components/Profile/Error";
import { getSession } from "next-auth/react";
import { useState } from "react";

import { Profile, Post as PostDTO } from "user-types";
import { Session } from "next-auth";
import SelfProfile from "@/components/Profile/SelfProfile";
import ViewProfile from "@/components/Profile/ViewProfile";

type ProfileProps = {
    profile_data?: Profile;
    session?: Session;
    profile_posts?: PostDTO[];
}

type ProfileNotFoundProps = {
    noProfileFound: boolean;
}


export default function Profile({ profile_data, session, profile_posts, noProfileFound }: ProfileProps & ProfileNotFoundProps) {

    const [selfProfile] = useState<boolean>(profile_data?.username === session?.user?.username);

    if (noProfileFound) {
        return <NoProfilePage />
    }

    if (selfProfile) {
        return <SelfProfile
            profile_data={profile_data}
            session={session}
            profile_posts={profile_posts}
        />
    }

    return <ViewProfile
        profile_data={profile_data}
        session={session}
        profile_posts={profile_posts}
    />
}

const NoProfilePage = () => {
    return (
        <>
            <UserError />
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
                    noProfileFound: false
                }))
            }
        }
        catch (err) {

        }
    }
    return {
        props: {
            noProfileFound: true
        }
    }
}
