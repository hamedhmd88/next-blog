"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

// کامپوننت مودال برای نمایش محتوا به صورت پاپ‌آپ روی صفحه
function Modal({ open, onClose, title, children, description = "" }) {
  // استفاده از هوک useOutsideClick برای بستن مودال هنگام کلیک خارج از آن
  const ref = useOutsideClick(onClose);

  return (
    // نمایش مودال فقط زمانی که open برابر با true باشد
    open &&
    createPortal(
      // لایه پس‌زمینه تیره و مات برای پوشاندن محتوای اصلی صفحه
      <div
        className="backdrop-blur-sm fixed top-0 left-0
           w-full h-screen bg-secondary-800 bg-opacity-30 z-50"
      >
        {/* باکس اصلی مودال */}
        <div
          ref={ref}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-lg bg-secondary-0 p-4 shadow-lg transition-all duration-500 ease-out
        w-[calc(100vw-2rem)] md:max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          {/* هدر مودال شامل عنوان، توضیحات و دکمه بستن */}
          <div
            className="flex items-center justify-between border-b 
          border-b-secondary-300 pb-2 mb-6"
          >
            <div>
              {/* عنوان مودال */}
              <p className="text-secondary-700 font-bold text-base">{title}</p>
              {/* توضیحات مودال (اختیاری) */}
              <p className="text-secondary-400 text-sm lg:text-base">
                {description}
              </p>
            </div>
            {/* دکمه بستن مودال */}
            <button onClick={onClose}>
              <XMarkIcon className="w-5 h-5 text-secondary-500" />
            </button>
          </div>
          {/* محتوای اصلی مودال که از طریق props.children دریافت می‌شود */}
          {children}
        </div>
      </div>,
      // رندر کردن مودال مستقیماً در body برای جلوگیری از مشکلات z-index
      document.body
    )
  );
}
export default Modal;
