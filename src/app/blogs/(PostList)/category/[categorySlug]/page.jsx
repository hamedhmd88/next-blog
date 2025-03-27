// import { getPosts } from "@/services/postServices";
// import setCookieOnReq from "@/utils/setCookieOnReq";
// import PostList from "app/blogs/_components/PostList";
// import { cookies } from "next/headers";
// import queryString from "query-string";

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

import { getPosts } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import PostList from "app/blogs/_components/PostList";
import { cookies } from "next/headers";
import queryString from "query-string";

async function Category({ params, searchParams }) {
  // گرفتن categorySlug از پارامترهای مسیر URL (params)
  const { categorySlug } = params;
  // ایجاد رشته‌ی کوئری برای درخواست API
  // ابتدا searchParams را به رشته‌ی کوئری تبدیل می‌کند، سپس categorySlug را به آن اضافه می‌کند
  const queries =
    queryString.stringify(searchParams) + "&" + `categorySlug=${categorySlug}`;

  // دسترسی به کوکی‌های سمت سرور برای احراز هویت در درخواست‌های API
  const cookieStore = cookies();

  // ایجاد تنظیمات (options) برای درخواست fetch
  // شامل کوکی‌های مورد نیاز در هدر (Headers) است
  const options = setCookieOnReq(cookieStore);

  // فراخوانی API برای دریافت پست‌های مرتبط با دسته‌بندی و پارامترهای جستجو
  const posts = await getPosts(queries, options);

  // رندر کردن محتوای صفحه
  return (
    <div>
      {posts === 0 ? (
        <p className="text-lg text-secondary-600 bg-slate-400">
          {" "}
          پستی در این دسته‌بندی پیدا نشد{" "}
        </p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default Category;
