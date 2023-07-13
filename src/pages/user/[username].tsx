import Image from "next/image";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from "axios";
import { GetServerSideProps } from "next";
import UserError from "@/components/Error";

type PageProps = {
    username: string;
    imageUrl: string;
    fullName: string;
}


export default function profile(userData: PageProps) {
    
    if(Object.keys(userData).length === 0){
        return <UserError/>;
    }
    return (
        <div className="w-full min-h-screen">
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
                </div>
                <div className="ml-12 name-followers-container self-start w-96 py-4 flex flex-col gap-y-4">
                    <h1 className="text-2xl">{userData.fullName}</h1>
                    <div className="stats flex flex-col">
                        <span>0 <span className="font-bold"> Subscribers</span></span>
                        <span>0 <span className="font-bold"> Subscriptions</span></span>
                        <span>0 <span className="font-bold"> Post</span></span>
                    </div>
                    <div className="button-container flex gap-x-2">
                        <button className="w-32 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-sm">Subscribe</button>
                        <button className="w-8 h-8 bg-neutral-100 text-black rounded-sm"><EmailOutlinedIcon/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
    const { username } = context.query;
    let userData : any;
    try{
        const profile = await axios.get(`${process.env.CANONICAL_URL}/api/user/${username}`);
        userData = profile.data;
    }
    catch(err){
        console.log(err);
    }

    return {
        props: userData || {}
    }
}
