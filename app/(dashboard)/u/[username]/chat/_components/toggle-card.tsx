'use client'

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from '@/components/ui/skeleton';

import { updateStream } from "@/actions/stream";
import { useTransition } from "react";

type fieldTypes = "isChatEnabled" | "isChatDelayed" | "followersOnly"

interface ToggleCardProps {
    field: fieldTypes;
    label: string;
    value: boolean;
}

export const ToggleCard = ({ field, label, value = false }: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition();

    function onClick() {
        startTransition(() => {
            updateStream({
                [field]: !value
            }).then(() => {
                toast.success("Settings updated")
            }).catch((error) => {
                toast.error("Error updating settings")
            })
        })
    }
    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex flex-items justify-between">
                <p className="font-semibold shrink-0">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch
                        disabled={isPending}
                        onClick={onClick}
                        checked={value}
                    >
                        {value ? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => {
    return <Skeleton className="rounded-xl p-10 w-full" />
}