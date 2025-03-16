import PostList from "../_components/PostList";
import { cookies } from "next/headers";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postServices";

// export const revalidate = 10;
// export const experimental_ppr = true; // STATIC + DYNAMIC = PPR

async function BlogPage({ searchParams }) {
  console.log(searchParams);
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(options);
  // console.log(posts);
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}

export default BlogPage;
