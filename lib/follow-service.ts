import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-service";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getCurrentUser();

    const otherUser = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (self.id === otherUser.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    //    return !!existingFollow;
    if (existingFollow) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getCurrentUser();

  const otherUser = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.id === otherUser.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following user");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
};

export const getFollowedUsers = async () => {
  try {
    const self = await getCurrentUser();

    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id,
      },
      include: {
        following: true,
      },
    });

    return followedUsers;
  } catch (e) {
    return [];
  }
};

export const unfollowUser = async (id: string) => {
  const self = await getCurrentUser();

  const otherUser = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.id === otherUser.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following user");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};
