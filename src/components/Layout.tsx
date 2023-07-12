import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

type LayoutProps = {
    children : ReactNode;
}

export default function Layout({children} : LayoutProps) {
  return (
    <>
    {/*<Navbar/>*/}
    <div className={""/*className='ml-[270px]'*/}> {/* Navbar Width is 270px*/}
        {children}
    </div>
    </>
  )
}
