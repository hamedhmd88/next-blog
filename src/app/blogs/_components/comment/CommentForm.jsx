"use client"; // استفاده از حالت کلاینت در React

import { createComment } from "@/lib/actions"; // ایمپورت تابع ایجاد نظر
import SubmitButton from "@/ui/SubmitButton"; // ایمپورت کامپوننت دکمه ارسال
import TextArea from "@/ui/TextArea"; // ایمپورت کامپوننت ناحیه متنی
import { useState, useActionState, useEffect } from "react"; // ایمپورت هوک‌های مورد نیاز از React
import toast from "react-hot-toast"; // ایمپورت کتابخانه toast برای نمایش پیام‌ها

const initilaState = {
  // تعریف وضعیت اولیه فرم
  error: "", // پیام خطا
  message: "", // پیام موفقیت
};

function CommentForm({ postId, parentId, onClose }) {
  // تعریف کامپوننت فرم نظر
  const [text, setText] = useState(""); // تعریف وضعیت محلی برای متن نظر
  const [state, formAction] = useActionState(createComment, initilaState); // استفاده از هوک برای مدیریت وضعیت فرم

  useEffect(() => {
    // استفاده از هوک useEffect برای واکنش به تغییرات وضعیت
    if (state?.message) {
      // اگر پیام موفقیت وجود داشت
      toast.success(state.message); // نمایش پیام موفقیت
      onClose(); // بستن فرم
    }
    if (state?.error) {
      // اگر پیام خطا وجود داشت
      toast.error(state.error); // نمایش پیام خطا
    }
  }, [state]); // وابستگی به تغییرات وضعیت

  return (
    <div>
      <div className="flex justify-center mt-4">
        {" "}
        {/* تنظیمات ظاهری فرم */}
        <div className="max-w-md  w-full">
          {" "}
          {/* تنظیمات عرض فرم */}
          <form
            className="space-y-7" // فاصله بین عناصر فرم
            //  action={createComment.bind(null, postId, parentId)} // تابع ارسال نظر
            action={async (formData) => {
              // تابع ارسال نظر به صورت غیرهمزمان
              await formAction({ formData, postId, parentId }); // اجرای تابع ارسال نظر
            }}
          >
            <TextArea
              name="text" // نام فیلد
              label="متن نظر" // برچسب فیلد
              value={text} // مقدار فیلد
              isRequired // الزامی بودن فیلد
              onChange={(e) => setText(e.target.value)} // تابع تغییر مقدار فیلد
            />
            <SubmitButton>تایید</SubmitButton> {/* دکمه ارسال فرم */}
          </form>
        </div>
      </div>
    </div>
  );
}
export default CommentForm; // خروجی گرفتن از کامپوننت فرم نظر
