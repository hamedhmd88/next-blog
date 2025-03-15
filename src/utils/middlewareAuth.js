// این تابع به صورت ناهمگام اجرا می‌شود و به عنوان یک میدلور برای احراز هویت کاربران عمل می‌کند.
export async function middlewareAuth(req) {
  // دریافت توکن دسترسی (accessToken) از کوکی‌های درخواست
  const accessToken = req.cookies.get("accessToken");

  // دریافت توکن تازه‌سازی (refreshToken) از کوکی‌های درخواست
  const refreshToken = req.cookies.get("refreshToken");

  // تنظیمات درخواست برای دریافت اطلاعات کاربر از سرور
  const options = {
    method: "GET", // روش درخواست HTTP (در اینجا دریافت اطلاعات)
    credentials: "include", // شامل کردن اطلاعات احراز هویت (کوکی‌ها)
    headers: {
      // تنظیم کوکی‌ها در هدر درخواست HTTP
      Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
    },
  };

  // دریافت داده‌ها از API
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    options
  )
    .then((res) => res.json()) // تبدیل پاسخ به JSON
    .then((res) => res.data); // استخراج داده‌ها از پاسخ

  // استخراج کاربر از داده‌ها
  const { user } = data || {};
  return user; // بازگرداندن کاربر
}
