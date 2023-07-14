import React, { ReactNode} from 'react'
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from './Loading';
type LayoutProps = {
    children: ReactNode;
}

const allowedPages = ['/', '/signup'];

export default function Layout({ children }: LayoutProps) {

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "authenticated") {
        return (
            <>
                <Navbar session={session} />
                <div className='ml-[500px]'>
                    {children}
                </div>
            </>
        );
    }
    if (status === "loading") return;

    if (status === "unauthenticated") {
        if (allowedPages.includes(router.route)) {
            return <div>{children};</div>
        }
        router.replace("/");
        return;
    }

    return null;
}
