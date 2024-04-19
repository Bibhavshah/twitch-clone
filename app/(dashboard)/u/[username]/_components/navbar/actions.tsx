import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

export const Actions = async () => {
    return (
        <div className="flex items-center justify-end gap-x-2">
            <Button
                variant='ghost'
                size='sm'
                className="text-muted-foreground hover:text-primary transition"
                asChild
            >
                <Link href='/'>
                    <LogOut className="w-5 h-5 mr-2" />
                    Exit
                </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}