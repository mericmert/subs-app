import type { ComponentStyle } from "@/utils/type"
import Logo from "./Logo"
import Link from "next/link"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

let NavbarComponentStyle: ComponentStyle = {
    linkStyle: "flex items-center gap-x-2 w-full h-full p-6"
}


export default function Navbar() {
    
    const router = useRouter();

    const logout = () => {
        signOut({
            redirect : false
        })
        router.push("/");
    }    
    return (
        <div className="navbar fixed flex flex-col w-[270px] h-screen shadow-sm shadow-neutral-500 text-white">
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
                    <Link className={NavbarComponentStyle.linkStyle} href="/profile">
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
