import { getFollowedUsers } from "@/lib/follow-service"
import { getRecommended } from "@/lib/recommended-service"

import { Toogle } from "./toogle"
import { Wrapper } from "./wrapper"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Following, FollowingSkeleton } from "./following"

export const Sidebar = async () => {
    const recommendedUsers = await getRecommended();
    const followedUsers = await getFollowedUsers();
    return (
        <Wrapper>
            <Toogle />
            <Following data={followedUsers} />
            <Recommended data={recommendedUsers} />
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    );
};