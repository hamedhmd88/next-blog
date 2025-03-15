import Link from "next/link";
import CoverImage from "./CoverImage";

import Author from "./Author";
import Reading from "./Reading";
import PostIntraction from "./PostIntraction";
import { getPosts } from "@/services/postServices";
import { cookies } from "next/headers";
import setCookieOnReq from "@/utils/setCookieOnReq";

async function PostList() {
  //   await new Promise((res) => setTimeout(() => res(), 3000));
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/list`);
  // const { data } = await res.json();
  // const { posts } = data;

  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(options);
  console.log(posts);


  return (
    <>
      {posts.length > 0 ? (
        <div className=" grid grid-cols-12 gap-8">
          {posts.map((post) => (
            <div key={post._id} className=" col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-300 p-2 rounded-lg">
              <CoverImage post={post} />

              {/* post content */}

              <div>
                <Link href={`/blogs/${post.slug}`}>
                  <h2 className=" mb-4 font-bold text-secondary-700">
                    {post.title}
                  </h2>
                </Link>

                {/* post author - readingTime */}
                <div className=" flex items-center justify-between mb-6">
                  <Author post={post} />

                  <Reading post={post} />
                </div>
                <PostIntraction post={post} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default PostList;
