import { redirect } from 'next/navigation'

import { getUserByUsername } from "@/lib/auth-service"

import { Navbar } from "./_components/navbar"
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
    params: { username: string },
    children: React.ReactNode
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
    const self = getUserByUsername(params.username)

    if (!self) {
        redirect('/')
    }

    return <>
        <div>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>{children}</Container>
            </div>
        </div>
    </>
}

export default CreatorLayout;