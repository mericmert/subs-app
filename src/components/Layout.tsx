import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react';

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <>
                <Navbar session={session} />
                <div className='ml-[270px]'>
                    {children}
                </div>
            </>
        );
    }
    if (status === "loading") return null;
    if (status === "unauthenticated") {
        return <div>{children}</div>;
    }
}

