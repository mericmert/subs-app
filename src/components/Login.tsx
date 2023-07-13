import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from './Logo';
import type { ComponentStyle } from "@/utils/type";
import Link from "next/link";
let loginComponentStyle: ComponentStyle = {
    inputStyle: "bg-gray-800 w-80 h-12 outline-none border-0 p-2 pl-10"
}

export default function Login() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-6 gap-y-16">
            <Logo font_size='text-6xl'/>
            <div className="login-form-container flex flex-col w-[70vw] h-2/3 items-center">
                <div className="login-title-container text-center">
                    <h1 className="text-4xl font-semibold mb-2">Login to Your Account</h1>
                    <span className="text-gray-400">&ldquo;Connect, engage, and up-to-date with a community sharing your passions!&rdquo;</span>
                </div>

                <form className="flex flex-col items-center w-full gap-y-6 mt-8">
                    <div className="relative">
                        <MailOutlineIcon className="absolute top-3 left-2" />
                        <input name='email' type="email" required={true} placeholder="E-mail" className={loginComponentStyle.inputStyle} />
                    </div>
                    <div className="relative">
                        <LockOutlinedIcon className="absolute top-3 left-2" />
                        <input name='password' type="password" required={true} placeholder="Password" className={loginComponentStyle.inputStyle} />
                    </div>
                    <button className="w-80 h-12 bg-gradient-to-l from-violet-900 via-purple-700 to-red-500">Login to Your Account</button>
                    <Link href={"/signup"}>Don&apos;t you have an account? Sign up</Link>
                </form>
            </div>

        </div>
    )
}
