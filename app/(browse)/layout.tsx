import React, { Suspense } from 'react'
import { Navbar } from './_components/Navbar/page';
import { Sidebar } from './_components/sidebar/page';
import { Container } from './_components/container';
import { SidebarSkeleton } from './_components/sidebar/page';

function BrowseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Navbar />
            <div className='flex h-full pt-20'>
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default BrowseLayout;
