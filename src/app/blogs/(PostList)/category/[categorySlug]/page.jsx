// import { getPosts } from "@/services/postServices";
// import setCookieOnReq from "@/utils/setCookieOnReq";
// import PostList from "app/blogs/_components/PostList";
// import { cookies } from "next/headers";
// import queryString from "query-string";

import PostList from "app/blogs/_components/PostList";

// async function Category({ params, searchParams }) {
//   const { categorySlug } = params;

//   const queries = `${queryString.stringify(
//     searchParams
//   )}&categorySlug=${categorySlug}`;

//   const cookieStore = cookies();
//   const options = setCookieOnReq(cookieStore);
//   const posts = await getPosts(queries, options);

//   return (
//     <div>
//       {posts.length === 0 ? (
//         <p className="text-lg text-secondary-600 ">
//           پستی در این دسته بندی پیدا نشد
//         </p>
//       ) : (
//         <PostList posts={posts} />
//       )}
//     </div>
//   );
// }

// export default Category;

async function Category({ params }) {
  // params => fetch server =>
  // /post/list?categorySlug=params.categorySlug
  const { categorySlug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?categorySlug=${categorySlug}`
  );
  const { data } = await res.json();
  const { posts } = data || {};
  return (
    <div>
      {posts === 0 ? (
        <p className=" text-lg text-secondary-600">
          {" "}
          پستی در این دسته بندی پیدا نشد{" "}
        </p>
      ) : (
        <PostList />
      )}
    </div>
  );
}

export default Category;
