// "use client";

// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import {
//   useParams,
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from "next/navigation";

// export default function Search() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const formSubmit = (e) => {
//     e.preventDefault();
//     const search = e.target.search;
//     const searchValue = search.value;
//     const newParams = new URLSearchParams(searchParams.toString());
//     if (searchValue) {
//       newParams.set("search", searchValue);
//     } else {
//       newParams.delete("search");
//     }

//     router.push(pathname + "?" + newParams.toString(), { scroll: false });
//     // router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
//   };

//   return (
//     <form className="relative" onSubmit={formSubmit}>
//       <input
//         type="text"
//         name="search"
//         placeholder="جستجو ..."
//         autoComplete="off"
//         className="textField__input py-3 text-xs bg-secondary-0"
//       />
//       <button
//         type="submit"
//         className="absolute left-0 top-0 ml-3 flex h-full items-center"
//       >
//         <MagnifyingGlassIcon className="h-4 text-secondary-400" />
//       </button>
//     </form>
//   );
// }

"use client"; // فعال کردن کامپوننت به عنوان یک Client Component در Next.js

// ایمپورت کردن آیکون ذره‌بین از Heroicons برای نمایش در دکمه جستجو
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// ایمپورت هوک‌های مورد نیاز برای کار با مسیرها و URL در Next.js
import {
  useParams, // برای دسترسی به پارامترهای داینامیک مسیر
  usePathname, // برای دسترسی به مسیر فعلی
  useRouter, // برای ناوبری و ریدایرکت‌ها
  useSearchParams, // برای خواندن پارامترهای جستجوی فعلی URL
} from "next/navigation";

// تعریف کامپوننت اصلی جستجو
export default function Search() {
  // گرفتن پارامترهای فعلی از URL
  const searchParams = useSearchParams();

  // دسترسی به روتر Next.js برای تغییر مسیرها
  const router = useRouter();

  // دریافت مسیر فعلی
  const pathname = usePathname();

  // تابع مدیریت ارسال فرم جستجو
  const formSubmit = (e) => {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم (رفرش صفحه)

    const search = e.target.search; // دسترسی به فیلد ورودی جستجو
    const searchValue = search.value; // مقدار نوشته شده توسط کاربر در ورودی جستجو

    // کپی کردن پارامترهای جستجوی موجود در URL به یک شیء جدید برای تغییر
    const newParams = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      // اگر مقداری در فیلد جستجو وجود داشت، پارامتر 'search' را به URL اضافه یا جایگزین می‌کند
      newParams.set("search", searchValue);
    } else {
      // اگر فیلد خالی بود، پارامتر 'search' را از URL حذف می‌کند
      newParams.delete("search");
    }

    // انتقال کاربر به مسیر فعلی به همراه پارامترهای جدید بدون اسکرول صفحه
    router.push(pathname + "?" + newParams.toString(), { scroll: false });

    // روش جایگزین برای push کردن مسیر (مشابه خط بالا)
    // router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // بازگشت المنت JSX فرم جستجو
  return (
    <form className="relative" onSubmit={formSubmit}>
      <input
        type="text" // نوع فیلد ورودی (متن)
        name="search" // نام فیلد برای دسترسی در فرم
        placeholder="جستجو ..." // متن راهنما برای نمایش در فیلد خالی
        autoComplete="off" // غیرفعال کردن تکمیل خودکار مرورگر
        className="textField__input py-3 text-xs bg-secondary-0" // کلاس‌های ظاهری
      />
      <button
        type="submit" // تعریف دکمه برای ارسال فرم
        className="absolute left-0 top-0 ml-3 flex h-full items-center" // موقعیت و استایل دکمه
      >
        {/* نمایش آیکون ذره‌بین داخل دکمه */}
        <MagnifyingGlassIcon className="h-4 text-secondary-400" />
      </button>
    </form>
  );
}
