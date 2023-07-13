import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from './Logo';
import type { ComponentStyle, SignUpUser } from "@/utils/type";
import Link from "next/link";
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
let signUpComponentStyle: ComponentStyle = {
    inputStyle: "bg-gray-800 w-80 h-12 outline-none border-0 p-2 pl-10"
}

export default function Signup() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const [userData, setUserData] = useState<SignUpUser>({
        email: "",
        username: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await axios.post("/api/register", {
                email: userData.email,
                username: userData.username,
                password: userData.password
            })
            toast.success("Account has been succesfully created!");
            router.push("/")
        }
        catch(e) {
            if (e instanceof AxiosError && e.response?.status == 409){
                toast.error("User already exists!");
            }
            else{
                toast.error("Something went wrong!");
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-6 gap-y-16">
            <Logo font_size='text-6xl' />
            <div className="login-form-container flex flex-col w-[70vw] h-2/3 items-center">
                <div className="login-title-container text-center">
                    <h1 className="text-4xl font-semibold mb-2">Sign up to Your Account</h1>
                    <span className="text-gray-400">&ldquo;You are only one step away from joining our vibrant community!&rdquo;</span>
                </div>

                <form onSubmit={handleSubmit} autoComplete='off' className="flex flex-col items-center w-full gap-y-6 mt-8">
                    <div className="relative">
                        <MailOutlineIcon className="absolute top-3 left-2" />
                        <input onChange={(e) => handleChange(e)} name='email' type="email" required={true} placeholder="E-mail" className={signUpComponentStyle.inputStyle} />
                    </div>
                    <div className="relative">
                        <AccountCircleOutlinedIcon className="absolute top-3 left-2" />
                        <input onChange={(e) => handleChange(e)} name='username' required={true} placeholder="Username" className={signUpComponentStyle.inputStyle} />
                    </div>
                    <div className="relative">
                        <LockOutlinedIcon className="absolute top-3 left-2" />
                        <input onChange={(e) => handleChange(e)} name='password' type="password" required={true} placeholder="Password" className={signUpComponentStyle.inputStyle} />
                    </div>
                    <button className="w-80 h-12 bg-gradient-to-r from-violet-900 via-purple-700 to-red-500">{isLoading ? "..." : "Login to Your Account"}</button>
                    <Link href={"/"}>Do you already have an account? Log in</Link>
                </form>
            </div>

        </div>
    )
}
