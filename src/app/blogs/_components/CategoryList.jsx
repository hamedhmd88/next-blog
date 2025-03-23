import Link from "next/link";

async function CategoryList() {
  // await new Promise((res) => setTimeout(() => res(), 3000));
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/list`);
  const { data } = await res.json();
  const { categories } = data;
  console.log(categories);
  return (
    <>
      <ul className=" space-y-4">
        <Link href="/blogs">همه</Link>
        {categories?.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              <Link href={`/blogs/category/${category.slug}`}>
                {category.title}
              </Link>
            </li>
          ))
        ) : (
          <p>دسته‌بندی‌ای یافت نشد.</p>
        )}
      </ul>
    </>
  );
}

export default CategoryList;
