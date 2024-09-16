import { getPosts } from "@/actions/posts";

import { useRouter } from "next/navigation";
import AddPostForm from "@/components/client/AddPostForm";
import Paginator from "@/components/client/Paginator";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page as string, 10) || 1;
  const pageSize = 10;
  const { posts, total } = await getPosts(page, pageSize);

  return (
    <div>
      <AddPostForm />
      <h2>POSTY</h2>
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.id}>
              <p>Data utworzenia: {post.createdAt.toLocaleString()}</p>
              <p>{post.title}</p>
            </div>
          );
        })}
      </div>
      <Paginator perPage={pageSize} total={total} />
    </div>
  );
}
