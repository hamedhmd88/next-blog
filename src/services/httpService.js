// const { default: axios } = require("axios");

// const app = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//   withCredentials: true,
// });

// // accessToken => jwt => national-id => unique !  => user id => jwt => localStorage , cookie
// // http only => no access on browser (js) => safe =>
// // =>  id = 1234566 => jwt => AFDSFSLKAQTEWRLDAKSJFEQRERQWLRKJ3434DFSDF => COOKIES =>

// // accessToken => 24 hrs =>
// // refreshToken => 30 days =>

// // 1. => access : OK => continue ...
// // 2. => access : EXPIRE => 1. log out =>  ...  2. login => HOW ?? =>
// //  based on refreshToken => create new accessToken => 24 hrs , 30 days => ...continue ...
// // 3. refresh : EXPIRES => new login =>

// app.interceptors.request.use(
//   (res) => res,
//   (err) => Promise.reject(err)
// );

// app.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalConfig = err.config;
//     if (err.response.status === 401 && !originalConfig._retry) {
//       originalConfig._retry = true;
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
//           {
//             withCredentials: true,
//           }
//         );
//         if (data) return app(originalConfig);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

// const http = {
//   get: app.get,
//   patch: app.patch,
//   put: app.put,
//   delete: app.delete,
//   post: app.post,
// };

// export default http;






const { default: axios } = require("axios"); // ایمپورت axios برای مدیریت درخواست‌های HTTP

// ایجاد نمونه‌ای از axios با تنظیمات اولیه
const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // تعیین آدرس پایه برای درخواست‌های HTTP از متغیر محیطی
  withCredentials: true, // فعال کردن ارسال خودکار کوکی‌ها و اعتبارنامه‌ها در درخواست‌ها
});

/*
  ** مدیریت توکن‌های احراز هویت **
  
  - accessToken: 
    * یک JWT (توکن وب JSON) که به‌عنوان شناسه‌ی کاربر عمل می‌کند.
    * این توکن یکتا است و معمولاً شامل شناسه‌ی کاربر (User ID) است.
    * معمولاً در کوکی‌ها یا localStorage ذخیره می‌شود.
  
  - HttpOnly Cookies:
    * این کوکی‌ها فقط از سمت سرور قابل دسترسی هستند و در مرورگر (JavaScript) قابل خواندن نیستند.
    * این روش امنیت بیشتری دارد زیرا از حملات XSS جلوگیری می‌کند.

  - مدت زمان اعتبار توکن‌ها:
    * accessToken: ۲۴ ساعت اعتبار دارد.
    * refreshToken: ۳۰ روز اعتبار دارد.

  ** نحوه مدیریت اعتبارسنجی توکن‌ها **
  
  1. اگر accessToken معتبر باشد، درخواست ادامه پیدا می‌کند.
  2. اگر accessToken منقضی شده باشد:
     - دو راه‌حل وجود دارد:
       1. کاربر از سیستم خارج شود.
       2. با استفاده از refreshToken، یک accessToken جدید ایجاد شود (با اعتبار ۲۴ ساعت).
  3. اگر refreshToken هم منقضی شده باشد، کاربر باید دوباره وارد حساب کاربری خود شود.
*/

// اضافه کردن یک اینترسپتور برای مدیریت درخواست‌های HTTP
app.interceptors.request.use(
  (res) => res, // درخواست را بدون تغییر ارسال می‌کند
  (err) => Promise.reject(err) // در صورت خطا، درخواست رد می‌شود
);

// اضافه کردن یک اینترسپتور برای مدیریت پاسخ‌های HTTP
app.interceptors.response.use(
  (res) => res, // اگر درخواست موفق باشد، پاسخ بدون تغییر بازگردانده می‌شود
  async (err) => {
    const originalConfig = err.config; // ذخیره پیکربندی اصلی درخواست

    // بررسی وضعیت ۴۰۱ (Unauthorized) برای تمدید توکن
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true; // مشخص کردن اینکه این درخواست یکبار دوباره اجرا شده است

      try {
        // درخواست برای دریافت توکن جدید با استفاده از refreshToken
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          {
            withCredentials: true, // ارسال کوکی‌ها برای احراز هویت
          }
        );

        if (data) return app(originalConfig); // درخواست اصلی را با توکن جدید مجدداً ارسال می‌کند
      } catch (error) {
        return Promise.reject(error); // در صورت خطا، درخواست رد می‌شود
      }
    }
    return Promise.reject(err); // در صورت هر خطای دیگری، درخواست رد می‌شود
  }
);

// تعریف توابع HTTP برای ارسال درخواست‌ها
const http = {
  get: app.get, // درخواست GET
  patch: app.patch, // درخواست PATCH
  put: app.put, // درخواست PUT
  delete: app.delete, // درخواست DELETE
  post: app.post, // درخواست POST
};

export default http; // خروجی گرفتن از ماژول برای استفاده در دیگر بخش‌های پروژه





