"use client";

import React, { useState } from "react";
import { createPost } from "@/actions/posts"; // Import server action
import { useRouter } from "next/navigation";

export default function PostForm() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Wywołaj server action
    const result = await createPost(formData);
    if (result.success) {
      router.push("/posts");
    } else {
    }
  };

  return (
    <form
      className="flex flex-col w-80 gap-4 m-10 p-4 border rounded"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Create Post
      </button>
    </form>
  );
}
