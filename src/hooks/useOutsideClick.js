import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  // ایجاد یک مرجع (ref) برای اشاره به المان DOM
  const ref = useRef();

  useEffect(() => {
    // تابع برای مدیریت کلیک‌های خارج از المان
    function handleClick(e) {
      // بررسی می‌کند که آیا المان مرجع وجود دارد و آیا کلیک خارج از آن انجام شده است
      if (ref.current && !ref.current.contains(e.target)) {
        // اجرای تابع handler که از بیرون به هوک ارسال شده است
        handler();
      }
    }

    // اضافه کردن یک event listener برای رویداد کلیک در سطح document
    // پارامتر listenCapturing تعیین می‌کند که رویداد در فاز capturing گرفته شود یا bubbling
    document.addEventListener("click", handleClick, listenCapturing);

    // تابع پاکسازی که هنگام unmount شدن کامپوننت یا تغییر وابستگی‌ها اجرا می‌شود
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]); // وابستگی‌های useEffect

  // بازگرداندن مرجع برای استفاده در کامپوننت
  return ref;
}
