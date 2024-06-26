import { getUserByUsername } from "@/lib/user-service"
import { isFollowingUser } from "@/lib/follow-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({ params }: UserPageProps) => {

    const user = await getUserByUsername(params.username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    return <div>User: {user.username}
        <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
}

export default UserPage;