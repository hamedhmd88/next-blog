import { NextResponse } from "next/server"; // ایمپورت کلاس NextResponse برای مدیریت پاسخ‌ها در میدلور
import { middlewareAuth } from "./utils/middlewareAuth"; // ایمپورت تابع احراز هویت از مسیر مشخص‌شده

// تعریف تابع میدلور که به صورت ناهمگام اجرا می‌شود
export async function middleware(req) {
  const { pathname } = req.nextUrl; // استخراج مسیر درخواست از URL

  // بررسی اینکه آیا مسیر درخواست مربوط به صفحات ورود (signin) یا ثبت‌نام (signup) است
  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    const user = await middlewareAuth(req); // دریافت اطلاعات کاربر از میدلور احراز هویت
    if (user) return NextResponse.redirect(new URL(`/`, req.url)); // اگر کاربر احراز هویت شده باشد، به صفحه اصلی هدایت شود
  }

  // بررسی اینکه آیا مسیر درخواست مربوط به پروفایل کاربر است
  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req); // دریافت اطلاعات کاربر از میدلور احراز هویت
    if (!user) return NextResponse.redirect(new URL(`/signin`, req.url)); // اگر کاربر احراز هویت نشده باشد، به صفحه ورود هدایت شود
  }
}

// تنظیمات مربوط به مسیرهایی که این میدلور برای آن‌ها اجرا می‌شود
export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"], // مشخص کردن مسیرهای موردنظر برای اعمال میدلور
};
