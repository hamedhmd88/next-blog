import PostList from "../_components/PostList";
import { cookies } from "next/headers";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postServices";
import queryString from "query-string";

// export const experimental_ppr = true; // STATIC + DYNAMIC

async function BlogPage({ searchParams }) {
  const queries = queryString.stringify(searchParams);
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(queries, options);

  const { search } = searchParams;

  return (
    <>
      {search ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0
            ? "هیچ پستی با این مشخصات پیدا نشد"
            : `نتیجه برای ${posts.length} نشان دادن `}
          <span className="font-bold">&quot;{search}&quot;</span>
        </p>
      ) : null}

      <PostList posts={posts} />
    </>
  );
}

export default BlogPage;


// For ENGLISH Text
// shoing 3 results for "folan"
// code => const resultText = posts.length > 1 ? "results" : "result";
//  `showing ${posts.length} ${resultText} for`