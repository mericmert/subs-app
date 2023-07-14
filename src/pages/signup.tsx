import Signup from "@/components/Signup";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function signup() {

    return (
        <Signup />
    )
}
