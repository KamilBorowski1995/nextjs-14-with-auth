"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export type PostCreateResponeType = {
  success: boolean;
  message: string;
};

export const createPost = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  const title = formData.get("title") as string;

  let returnJson = { success: false, message: "Failed to create post" };

  try {
    await prisma.post.create({
      data: {
        title: title,
        authorId: session?.user.id,
      },
    });
    returnJson = { success: true, message: "Post created successfully" };
  } catch (error) {
    console.error("Failed to create post:", error);
    returnJson = { success: false, message: "Failed to create post" };
  }

  revalidatePath("/posts");
  return returnJson;
};

export const getPosts = async (page: number = 1, pageSize: number = 10) => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return { posts: [], total: 0 };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { authorId: session?.user.id },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({
      where: { authorId: session?.user.id },
    }),
  ]);

  return { posts, total };
};
