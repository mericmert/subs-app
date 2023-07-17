import Signup from "@/components/Signup";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

/* refactored */
export default function signup() {

    return (
        <Signup />
    )
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
    const session = await getSession(context);
    if (session) {
        return {
            redirect : {
                destination : "/"
            },
            props : {}
        }
    }
    return {
        props : {}
    }
}
