import React from 'react'
import { Navbar } from './_components/Navbar/page';

function BrowseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Navbar />
            <div className='flex h-full pt-20'>
                {children}
            </div>
        </>
    )
}

export default BrowseLayout;
