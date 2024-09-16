"use client";

import React, { useState } from "react";
import { createPost, PostCreateResponeType } from "@/actions/posts"; // Import server action

const AddPostForm = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result: PostCreateResponeType = await createPost(formData);

    setMessage(result.message);
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
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

export default AddPostForm;
