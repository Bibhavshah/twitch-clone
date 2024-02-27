import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toogle } from "./toogle"
import { Wrapper } from "./wrapper"

import { getRecommended } from "@/lib/recommended-service"

export const Sidebar = async () => {
    const recommendedUsers = await getRecommended();
    return (
        <Wrapper>
            <Toogle />
            <Recommended data={recommendedUsers} />
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <RecommendedSkeleton />
        </aside>
    );
};