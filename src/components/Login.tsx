import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from './Logo';
import { LoginUser, type ComponentStyle } from "@/utils/type";
import Link from "next/link";
import { useState } from 'react';
import { SignInResponse, signIn } from "next-auth/react"
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
let loginComponentStyle: ComponentStyle = {
    inputStyle: "bg-gray-800 w-80 h-12 outline-none border-0 p-2 pl-10"
}

export default function Login() {

    const router = useRouter();
    const [credentials, setCredentials] = useState<LoginUser>({
            email : "",
            password : ""
        }
    );
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCredentials(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let res : SignInResponse | undefined = await signIn("credentials", {
            redirect : false,
            email : credentials.email,
            password : credentials.password
         });
         if (res?.ok){
            toast.success("You have succesfully logged in!");
            router.replace("/");
            
         }
         else{
            toast.error("Invalid credentials");
         }
    }


    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-6 gap-y-16">
            <Logo font_size='text-6xl' />
            <div className="login-form-container flex flex-col w-[70vw] h-2/3 items-center">
                <div className="login-title-container text-center">
                    <h1 className="text-4xl font-semibold mb-2">Login to Your Account</h1>
                    <span className="text-gray-400">&ldquo;Connect, engage, and up-to-date with a community sharing your passions!&rdquo;</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-y-6 mt-8">
                    <div className="relative">
                        <MailOutlineIcon className="absolute top-3 left-2" />
                        <input onChange={e => handleChange(e)} name='email' type="email" required={true} placeholder="E-mail" className={loginComponentStyle.inputStyle} />
                    </div>
                    <div className="relative">
                        <LockOutlinedIcon className="absolute top-3 left-2" />
                        <input onChange={e => handleChange(e)} name='password' type="password" required={true} placeholder="Password" className={loginComponentStyle.inputStyle} />
                    </div>
                    <button className="w-80 h-12 bg-gradient-to-l from-violet-900 via-purple-700 to-red-500">{isLoading ? "..." : "Login to Your Account"}</button>
                    <Link href={"/signup"}>Don&apos;t you have an account? Sign up</Link>
                </form>
            </div>

        </div>
    )
}
