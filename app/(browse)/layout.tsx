import React from 'react'
import { Navbar } from './_components/Navbar/page';
import { Sidebar } from './_components/sidebar/page';
import { Container } from './_components/container';

function BrowseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Navbar />
            <div className='flex h-full pt-20'>
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default BrowseLayout;
