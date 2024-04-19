"use server";

import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getCurrentUser = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized Access");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  return user;
};

export const getUserByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized Access");
  }

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  if (user.username !== self.username) {
    throw new Error("Can't Access others creator dashboard");
  }

  return user;
};
