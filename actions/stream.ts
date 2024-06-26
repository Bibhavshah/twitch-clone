"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-service";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
  const self = await getCurrentUser();
  const selfStream = await db.stream.findUnique({
    where: {
      userId: self.id,
    },
  });

  if (!selfStream) {
    throw new Error("Stream not found");
  }

  const validData = {
    name: values.name,
    isChatEnabled: values.isChatEnabled,
    isChatDelayed: values.isChatDelayed,
    followersOnly: values.followersOnly,
  };

  const stream = await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      ...validData,
    },
  });

  revalidatePath(`/u/${self.username}/chat`);
  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/${self.username}`);

  return stream;
};
