"use client"

import { useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { onFollow, onUnfollow } from "@/actions/follow"
import { onBlock, onUnblock } from "@/actions/block"

interface ActionsProps {
    isFollowing: boolean
    userId: string
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition()

    function handleOnFollow() {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You followed ${data.following.username}`))
                .catch(() => toast.error("Failed to Follow"))
        })
    }

    function handleOnUnFollow() {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.error(`You unfollowed ${data.following.username}`))
                .catch(() => toast.error("Failed to Follow"))
        })
    }

    function handlefollow() {
        if (isFollowing) {
            handleOnUnFollow()
        } else {
            handleOnFollow()
        }
    }

    function handleBlock() {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`You blocked ${data.blocked.username}`))
                .catch(() => toast.error("Failed to Block"))
        })
    }

    return <>
        <Button disabled={isPending} onClick={handlefollow} variant="primary">{isFollowing ? "Unfollow" : "follow"}</Button>
        <Button onClick={handleBlock} disabled={isPending}>Block</Button>
    </>
}