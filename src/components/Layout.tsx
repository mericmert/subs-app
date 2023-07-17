import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from './Loading';
import { Session } from 'next-auth';

type LayoutProps = {
    children: ReactNode;
}
const allowedPages: string[] = ['/', '/signup'];

export default function Layout({ children }: LayoutProps) {

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "authenticated") {
        return (
            <AuthenticatedLayout session={session}>
                {children}
            </AuthenticatedLayout>
        );
    }
    if (status === "loading") return null;

    if (status === "unauthenticated") {
        if (!allowedPages.includes(router.route)) {
            router.replace("/");
            return null;
        }
        return (
            <UnauthenticatedLayout>
                {children}
            </UnauthenticatedLayout>
        );
    }

    return null;
}

const AuthenticatedLayout = ({ session, children }: { session: Session, children: React.ReactNode }) => {
    return (
        <>
            <Navbar session={session} />
            <div className='ml-[500px]'>
                {children}
            </div>
        </>
    )
}

const UnauthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    )
}
