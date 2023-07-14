import type { ComponentStyle } from "@/utils/type"
import Logo from "./Logo"
import Link from "next/link"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

let NavbarComponentStyle: ComponentStyle = {
    linkStyle: "flex items-center gap-x-2 w-full h-full p-6"
}


export default function Navbar({session} : any) {
    
    const router = useRouter();

    const logout = () => {
        signOut({
            redirect : false
        })
        router.push("/");
    }    
    return (
        <div className="pl-64 navbar fixed flex flex-col w-[500px] h-screen border-r-[.5px] border-neutral-700 text-white">
            <div className="logo-container p-6 ">
                <Logo font_size="text-5xl" />
            </div>
            <ul className="relative navbar-items flex flex-col h-full text-lg">
                <li>
                    <Link className={NavbarComponentStyle.linkStyle} href="/">
                        <HomeOutlinedIcon />
                        Feed
                    </Link>
                </li>
                <li>
                    <Link className={NavbarComponentStyle.linkStyle} href={`/user/${session.user.username}`}>
                        <AccountCircleOutlinedIcon />
                        Profile
                    </Link>
                </li>
                <li>
                    <Link className={NavbarComponentStyle.linkStyle} href="/notification">
                        <NotificationsNoneOutlinedIcon />
                        Notifications
                    </Link>
                </li>
                <li>
                    <Link className={NavbarComponentStyle.linkStyle} href="/settings">
                        <SettingsOutlinedIcon />
                        Settings
                    </Link>
                </li>
                <li className="absolute bottom-6">
                    <button onClick={logout} className={NavbarComponentStyle.linkStyle}>
                        <LogoutOutlinedIcon />
                        Log out
                    </button>
                </li>
            </ul>
        </div>
    )
}

