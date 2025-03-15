"use client";
import Link from "next/link";

function NotFound() {
  return (
    <div className="h-screen">
      <div className="container xl:max-w-screen-xl">
        <div className="flex justify-center pt-10">
          <div>
            <h1 className="text-xl font-bold text-red-600 mb-8">
                هیچ پستی با این مشخصات یافت نشد
            </h1>
            <Link href="/blogs" className=" text-secondary-500">
                رفتن به صفحه بلاگ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
